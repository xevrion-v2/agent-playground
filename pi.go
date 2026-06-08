package pi

import (
	"context"
	"errors"
	"fmt"
	"log"
	"math"
	"math/big"
	"runtime"
	"strings"
	"sync"
	"time"
)

const (
	// DefaultPrecision is the default number of decimal places for π calculation
	DefaultPrecision = 100

	// MaxPrecision is the maximum supported precision
	MaxPrecision = 100000

	// MinPrecision is the minimum required precision
	MinPrecision = 1

	// SafetyIterationLimit prevents infinite loops
	SafetyIterationLimit = 1000000

	// ConvergenceThreshold for stopping the Chudnovsky algorithm
	ConvergenceThreshold = 1e-100

	// CacheExpirationDuration is how long cached results remain valid
	CacheExpirationDuration = 24 * time.Hour
)

// PiSymbolic represents the mathematical constant π (pi).
// Since π is an irrational number, it cannot be fully computed
// to a finite number of decimal places. This type provides a
// symbolic representation with high-precision approximation capabilities.
type PiSymbolic struct {
	mu            sync.RWMutex
	precision     int
	calculated    string
	lastCalculated time.Time
	calculationCount int64
}

// PiConfig holds configuration for π calculation
type PiConfig struct {
	Precision       int
	UseCache        bool
	ParallelEnabled bool
	WorkerCount     int
	Timeout         time.Duration
}

// DefaultPiConfig returns default configuration
func DefaultPiConfig() PiConfig {
	return PiConfig{
		Precision:       DefaultPrecision,
		UseCache:        true,
		ParallelEnabled: runtime.NumCPU() > 1,
		WorkerCount:     runtime.NumCPU(),
		Timeout:         5 * time.Minute,
	}
}

// PiResult holds the result of a π calculation
type PiResult struct {
	Value       string
	Precision   int
	Iterations  int
	Duration    time.Duration
	Error       error
}

// NewPiSymbolic creates a new PiSymbolic instance with default settings.
func NewPiSymbolic() *PiSymbolic {
	return &PiSymbolic{
		precision:  DefaultPrecision,
		calculated: "",
	}
}

// String returns the symbolic representation of π.
func (p *PiSymbolic) String() string {
	return "π (pi) — an irrational, transcendental number"
}

// Decimal returns an error indicating that π cannot be fully computed.
func (p *PiSymbolic) Decimal() (string, error) {
	return "", fmt.Errorf("π is irrational and transcendental; it has no finite decimal representation")
}

// Approx returns a high-precision approximation of π using the Chudnovsky algorithm.
// The precision parameter specifies the number of decimal places.
func (p *PiSymbolic) Approx(precision int) (string, error) {
	if err := validatePrecision(precision); err != nil {
		return "", fmt.Errorf("invalid precision: %w", err)
	}

	config := DefaultPiConfig()
	config.Precision = precision
	config.UseCache = true

	result, err := p.ApproxWithConfig(config)
	if err != nil {
		return "", fmt.Errorf("failed to calculate π: %w", err)
	}

	return result.Value, nil
}

// ApproxWithConfig returns a high-precision approximation of π with custom configuration.
func (p *PiSymbolic) ApproxWithConfig(config PiConfig) (*PiResult, error) {
	if err := validateConfig(config); err != nil {
		return nil, fmt.Errorf("invalid config: %w", err)
	}

	// Check cache first
	if config.UseCache {
		p.mu.RLock()
		if p.calculated != "" && p.precision >= config.Precision && 
		   time.Since(p.lastCalculated) < CacheExpirationDuration {
			result := &PiResult{
				Value:     p.calculated[:config.Precision+2],
				Precision: config.Precision,
				Duration:  time.Since(p.lastCalculated),
			}
			p.mu.RUnlock()
			return result, nil
		}
		p.mu.RUnlock()
	}

	// Create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), config.Timeout)
	defer cancel()

	// Calculate using Chudnovsky algorithm
	result, err := calculatePiChudnovsky(ctx, config)
	if err != nil {
		return nil, fmt.Errorf("failed to calculate π: %w", err)
	}

	// Update cache
	if config.UseCache {
		p.mu.Lock()
		if config.Precision > p.precision {
			p.calculated = result.Value
			p.precision = config.Precision
			p.lastCalculated = time.Now()
			p.calculationCount++
		}
		p.mu.Unlock()
	}

	return result, nil
}

// GetStats returns calculation statistics
func (p *PiSymbolic) GetStats() map[string]interface{} {
	p.mu.RLock()
	defer p.mu.RUnlock()
	
	return map[string]interface{}{
		"precision":        p.precision,
		"calculated":       p.calculated != "",
		"lastCalculated":   p.lastCalculated,
		"calculationCount": p.calculationCount,
	}
}

// validatePrecision validates the precision parameter
func validatePrecision(precision int) error {
	if precision < MinPrecision {
		return fmt.Errorf("precision must be at least %d, got %d", MinPrecision, precision)
	}
	if precision > MaxPrecision {
		return fmt.Errorf("precision cannot exceed %d decimal places, got %d", MaxPrecision, precision)
	}
	return nil
}

// validateConfig validates the configuration
func validateConfig(config PiConfig) error {
	if err := validatePrecision(config.Precision); err != nil {
		return err
	}
	if config.WorkerCount < 1 {
		return fmt.Errorf("worker count must be at least 1, got %d", config.WorkerCount)
	}
	if config.Timeout <= 0 {
		return fmt.Errorf("timeout must be positive, got %v", config.Timeout)
	}
	return nil
}

// calculatePiChudnovsky implements the Chudnovsky algorithm for high-precision π calculation.
// This is one of the fastest known algorithms for computing π.
func calculatePiChudnovsky(ctx context.Context, config PiConfig) (*PiResult, error) {
	log.Printf("Starting π calculation with %d decimal places, workers: %d", 
		config.Precision, config.WorkerCount)
	start := time.Now()

	// Calculate required precision for intermediate operations
	// Each decimal digit requires ~log2(10) ≈ 3.32 bits, plus safety margin
	requiredBits := uint(float64(config.Precision) * 3.32 * 4) // 4x safety margin
	prec := requiredBits

	// Initialize big.Float with required precision
	pi := new(big.Float).SetPrec(prec)
	
	var sum *big.Float
	var iterations int
	var err error

	if config.ParallelEnabled && config.WorkerCount > 1 {
		sum, iterations, err = calculatePiParallel(ctx, config, prec)
	} else {
		sum, iterations, err = calculatePiSequential(ctx, config, prec)
	}

	if err != nil {
		return nil, fmt.Errorf("calculation failed: %w", err)
	}

	// π = 1 / (12 * sum)
	pi.Mul(sum, new(big.Float).SetPrec(prec).SetInt64(12))
	pi.Quo(new(big.Float).SetPrec(prec).SetInt64(1), pi)

	// Convert to string with requested precision
	result := pi.Text('f', config.Precision+2)

	elapsed := time.Since(start)
	log.Printf("π calculation completed in %v with %d decimal places, %d iterations", 
		elapsed, config.Precision, iterations)

	return &PiResult{
		Value:      result,
		Precision:  config.Precision,
		Iterations: iterations,
		Duration:   elapsed,
	}, nil
}

// calculatePiSequential performs sequential Chudnovsky calculation
func calculatePiSequential(ctx context.Context, config PiConfig, prec uint) (*big.Float, int, error) {
	sum := new(big.Float).SetPrec(prec)
	term := new(big.Float).SetPrec(prec)
	
	// Pre-compute constants
	C := new(big.Float).SetPrec(prec).SetInt64(640320)
	C3 := new(big.Float).SetPrec(prec)
	C3.Mul(C, C).Mul(C3, C)
	C3.Quo(C3, new(big.Float).SetPrec(prec).SetInt64(24))

	k := 0
	for {
		select {
		case <-ctx.Done():
			return nil, 0, fmt.Errorf("calculation cancelled: %w", ctx.Err())
		default:
		}

		term.SetPrec(prec)

		// Calculate term using optimized Chudnovsky formula
		err := calculateTerm(term, k, C3, prec)
		if err != nil {
			return nil, 0, fmt.Errorf("term calculation failed at iteration %d: %w", k, err)
		}

		// Check convergence
		threshold := new(big.Float).SetPrec(prec).SetFloat64(ConvergenceThreshold)
		if term.Abs(term).Cmp(threshold) < 0 {
			break
		}

		sum.Add(sum, term)
		k++

		if k > SafetyIterationLimit {
			return nil, 0, fmt.Errorf("calculation did not converge within %d iterations", SafetyIterationLimit)
		}
	}

	return sum, k, nil
}

// calculatePiParallel performs parallel Chudnovsky calculation
func calculatePiParallel(ctx context.Context, config PiConfig, prec uint) (*big.Float, int, error) {
	type termResult struct {
		index int
		term  *big.Float
		err   error
	}

	termChan := make(chan termResult, config.WorkerCount*2)
	doneChan := make(chan struct{})
	
	var wg sync.WaitGroup
	var mu sync.Mutex
	sum := new(big.Float).SetPrec(prec)
	iterations := 0
	converged := false

	// Pre-compute constants
	C := new(big.Float).SetPrec(prec).SetInt64(640320)
	C3 := new(big.Float).SetPrec(prec)
	C3.Mul(C, C).Mul(C3, C)
	C3.Quo(C3, new(big.Float).SetPrec(prec).SetInt64(24))

	// Worker pool
	for i := 0; i < config.WorkerCount; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case <-doneChan:
					return
				default:
				}

				mu.Lock()
				if converged {
					mu.Unlock()
					return
				}
				k := iterations
				iterations++
				mu.Unlock()

				term := new(big.Float).SetPrec(prec)
				err := calculateTerm(term, k, C3, prec)
				if err != nil {
					termChan <- termResult{index: k, err: err}
					return
				}

				threshold := new(big.Float).SetPrec(prec).SetFloat64(ConvergenceThreshold)
				if term.Abs(term).Cmp(threshold) < 0 {
					mu.Lock()
					converged = true
					mu.Unlock()
					close(doneChan)
					return
				}

				termChan <- termResult{index: k, term: term}
			}
		}(i)
	}

	// Collector goroutine
	go func() {
		wg.Wait()
		close(termChan)
	}()

	// Collect results
	for result := range termChan {
		if result.err != nil {
			return nil, 0, fmt.Errorf("parallel calculation error at iteration %d: %w", result.index, result.err)
		}
		if result.term != nil {
			sum.Add(sum, result.term)
		}
	}

	return sum, iterations, nil
}

// calculateTerm calculates a single term of the Chudnovsky series
func calculateTerm(term *big.Float, k int, C3 *big.Float, prec uint) error {
	// (-1)^k
	sign := new(big.Float).SetPrec(prec)
	if k%2 == 0 {
		sign.SetInt64(1)
	} else {
		sign.SetInt64(-1)
	}

	// (6k)! / ((3k)! * (k!)^3)
	factorial6k := factorial(6*k, prec)
	factorial3k := factorial(3*k, prec)
	factorialK := factorial(k, prec)
	
	factorialKCubed := new(big.Float).SetPrec(prec)
	factorialKCubed.Mul(factorialK, factorialK).Mul(factorialKCubed, factorialK)

	numerator := new(big.Float).SetPrec(prec)
	numerator.Quo(factorial6k, factorial3k)
	numerator.Quo(numerator, factorialKCubed)

	// (13591409 + 545140134*k)
	linearTerm := new(big.Float).SetPrec(prec).SetInt64(13591409)
	kBig := new(big.Float).SetPrec(prec).SetInt64(int64(k))
	kTerm := new(big.Float).SetPrec(prec)
	kTerm.Mul(kBig, new(big.Float).SetPrec(prec).SetInt64(545140134))
	linearTerm.Add(linearTerm, kTerm)

	numerator.Mul(numerator, linearTerm)

	// 640320^(3k+3/2)
	denominator := new(big.Float).SetPrec(prec).Set(C3)
	denominator.Pow(denominator, new(big.Float).SetPrec(prec).SetInt64(int64(k)))

	term.Quo(numerator, denominator)
	term.Mul(term, sign)

	return nil
}

// factorial calculates n! as a big.Float with given precision.
func factorial(n int, prec uint) *big.Float {
	if n < 0 {
		return new(big.Float).SetPrec(prec).SetInt64(0)
	}
	
	result := new(big.Float).SetPrec(prec).SetInt64(1)
	
	// Use iterative multiplication with early exit for large numbers
	for i := 2; i <= n; i++ {
		result.Mul(result, new(big.Float).SetPrec(prec).SetInt64(int64(i)))
		
		// Check for overflow or infinity
		if result.IsInf() {
			return new(big.Float).SetPrec(prec).SetInf(false)
		}
	}
	
	return result
}

// CalculatePi returns a symbolic representation of π.
func CalculatePi() (*PiSymbolic, error) {
	log.Println("Creating symbolic π representation")
	return NewPiSymbolic(), nil
}

// CalculatePiWithPrecision attempts to compute π to the given number
// of decimal places.
func CalculatePiWithPrecision(precision int) (string, error) {
	if err := validatePrecision(precision); err != nil {
		return "", fmt.Errorf("invalid precision: %w", err)
	}

	log.Printf("Calculating π with %d decimal places", precision)

	pi := NewPiSymbolic()
	result, err := pi.Approx(precision)
	if err != nil {
		return "", fmt.Errorf("failed to calculate π with precision %d: %w", precision, err)
	}

	// Validate result
	if err := validatePiResult(result, precision); err != nil {
		return "", fmt.Errorf("result validation failed: %w", err)
	}

	return result, nil
}

// validatePiResult validates the calculated π value
func validatePiResult(result string, expectedPrecision int) error {
	if !strings.HasPrefix(result, "3.") {
		return errors.New("calculated π does not start with '3.'")
	}

	decimalPart := strings.TrimPrefix(result, "3.")
	if len(decimalPart) != expectedPrecision {
		return fmt.Errorf("expected %d decimal places, got %d", expectedPrecision, len(decimalPart))
	}

	// Validate that all characters are digits
	for i, c := range decimalPart {
		if c < '0' || c > '9' {
			return fmt.Errorf("invalid character '%c' at position %d", c, i+1)
		}
	}

	return nil
}

// Pi is a symbolic constant representing the mathematical constant π.
var Pi = NewPiSymbolic()

// init performs package-level initialization and validation.
func init() {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile | log.Lmicroseconds)
	log.Println("π package initialized")

	// Validate that the package can calculate π
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	config := DefaultPiConfig()
	config.Precision = 10
	config.Timeout = 30 * time.Second

	result, err := Pi.ApproxWithConfig(config)
	if err != nil {
		log.Printf("Warning: π calculation validation failed: %v", err)
		return
	}

	if err := validatePiResult(result.Value, 10); err != nil {
		log.Printf("Warning: π result validation failed: %v", err)
	}

	log.Printf("π calculation validation successful: %s...", result.Value[:20])
}

// Helper function to check if a float64 is approximately zero
func isApproximatelyZero(f *big.Float) bool {
	zero := new(big.Float).SetPrec(f.Prec()).SetFloat64(0)
	return f.Cmp(zero) == 0
}

// Helper function to safely convert big.Float to float64
func bigFloatToFloat64(f *big.Float) (float64, error) {
	f64, _ := f.Float64()
	if math.IsInf(f64, 0) || math.IsNaN(f64) {
		return 0, fmt.Errorf("conversion resulted in invalid float