import json
from typing import List, Dict, Any, Optional
from datetime import datetime

class MemoryManager:
    def __init__(self, max_memory_items: int = 100):
        self.memory_items = []
        self.max_memory_items = max_memory_items
    
    def add_memory(self, content: str, metadata: Optional[Dict] = None) -> None:
        """Add a memory item with timestamp and metadata."""
        memory_item = {
            'content': content,
            'timestamp': datetime.now().isoformat(),
            'metadata': metadata or {}
        }
        
        self.memory_items.append(memory_item)
        
        # Keep only the most recent memories
        if len(self.memory_items) > self.max_memory_items:
            self.memory_items = self.memory_items[-self.max_memory_items:]
    
    def get_relevant_memories(self, query: str, limit: int = 10) -> List[Dict]:
        """Get relevant memories based on simple content matching."""
        if not query:
            return self.memory_items[-limit:] if limit else self.memory_items[-10:]
        
        # Simple relevance scoring based on keyword matching
        scored_memories = []
        for memory in self.memory_items:
            score = 0
            content = memory['content'].lower()
            query_terms = query.lower().split()
            
            for term in query_terms:
                if term in content:
                    score += 1
            
            if score > 0:
                scored_memories.append((score, memory))
        
        # Sort by score (highest first) and return
        scored_memories.sort(key=lambda x: x[0], reverse=True)
        relevant_memories = [memory for _, memory in scored_memories[:limit]]
        
        # If we don't have enough relevant memories, add recent ones
        if len(relevant_memories) < limit:
            recent_memories = self.memory_items[-(limit - len(relevant_memories)):]
            # Avoid duplicates
            recent_memories = [m for m in recent_memories if m not in relevant_memories]
            relevant_memories.extend(recent_memories)
        
        return relevant_memories
    
    def clear_memory(self) -> None:
        """Clear all memory items."""
        self.memory_items = []
    
    def save_memory(self, filepath: str) -> None:
        """Save memory items to a file."""
        with open(filepath, 'w') as f:
            json.dump(self.memory_items, f, indent=2)
    
    def load_memory(self, filepath: str) -> None:
        """Load memory items from a file."""
        try:
            with open(filepath, 'r') as f:
                self.memory_items = json.load(f)
        except FileNotFoundError:
            self.memory_items = []