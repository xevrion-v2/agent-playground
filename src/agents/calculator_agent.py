import math
import re
from typing import Optional, Dict, Any
from .base_agent import BaseAgent

class CalculatorAgent(BaseAgent):
    """Agent that performs mathematical calculations."""
    
    def __init__(self):
        super().__init__("calculator")
        self.constants = {
            'pi': math.pi,
            'e': math.e,
            'phi': (1 + math.sqrt(5)) / 2
        }
    
    def process(self, query: str) -> Dict[str, Any]:
        """Process a calculation query."""
        query = query.lower().strip()
        
        # Handle special cases
        if query == "pi" or query == "π":
            return {
                "result": math.pi,
                "explanation": "The mathematical constant π (pi)"
            }
        
        # Check for pi calculation requests
        if "calculate pi" in query or "compute pi" in query or "value of pi" in query:
            # Use high precision pi calculation
            pi_value = self._calculate_pi()
            return {
                "result": pi_value,
                "explanation": f"Calculated π using the Chudnovsky algorithm with high precision"
            }
        
        # Try to evaluate as a mathematical expression
        try:
            # Replace common mathematical symbols
            expr = query.replace('^', '**').replace('π', 'pi').replace('÷', '/')
            
            # Replace constants
            for const_name, const_value in self.constants.items():
                expr = expr.replace(const_name, str(const_value))
            
            # Remove any non-math characters (safety measure)
            expr = re.sub(r'[^0-9+\-*/().\s]', '', expr)
            
            # Evaluate safely
            result = eval(expr, {"__builtins__": {}}, {})
            
            return {
                "result": float(result) if isinstance(result, (int, float)) else result,
                "explanation": f"Calculated: {query} = {result}"
            }
            
        except Exception as e:
            return {
                "error": f"Could not calculate: {str(e)}",
                "explanation": "Please provide a valid mathematical expression"
            }
    
    def _calculate_pi(self, iterations: int = 20) -> float:
        """Calculate pi using the Chudnovsky algorithm for high precision."""
        import decimal
        from decimal import Decimal, getcontext
        
        # Set high precision
        getcontext().prec = 50
        
        C = Decimal(426880) * Decimal(10005).sqrt()
        M = Decimal(1)
        L = Decimal(13591409)
        X = Decimal(1)
        K = Decimal(6)
        S = Decimal(13591409)
        
        for i in range(1, iterations):
            M = M * (K ** 3 - 16 * K) / Decimal((i + 1) ** 3)
            L += Decimal(545140134)
            X *= Decimal(-262537412640768000)
            K += Decimal(12)
            S += M * L / X
        
        pi = C / S
        return float(pi)
    
    def get_capabilities(self) -> Dict[str, Any]:
        """Return agent capabilities."""
        return {
            "name": "Calculator",
            "description": "Performs mathematical calculations including high-precision pi calculation",
            "examples": [
                "2 + 2",
                "pi * 5^2",
                "calculate pi",
                "e^(i*pi) + 1"
            ]
        }