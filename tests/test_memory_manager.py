import pytest
import tempfile
import os
from src.agent.memory_manager import MemoryManager

def test_add_memory():
    mm = MemoryManager(max_memory_items=5)
    mm.add_memory("Test memory 1")
    mm.add_memory("Test memory 2", {"source": "test"})
    
    assert len(mm.memory_items) == 2
    assert mm.memory_items[0]['content'] == "Test memory 1"
    assert mm.memory_items[1]['metadata']['source'] == "test"

def test_memory_eviction():
    mm = MemoryManager(max_memory_items=3)
    
    for i in range(5):
        mm.add_memory(f"Memory {i}")
    
    assert len(mm.memory_items) == 3
    assert mm.memory_items[0]['content'] == "Memory 2"
    assert mm.memory_items[-1]['content'] == "Memory 4"

def test_get_relevant_memories():
    mm = MemoryManager()
    mm.add_memory("The quick brown fox")
    mm.add_memory("Jumps over the lazy dog")
    mm.add_memory("Python programming language")
    mm.add_memory("Artificial intelligence agents")
    
    relevant = mm.get_relevant_memories("fox dog", limit=2)
    assert len(relevant) == 2
    contents = [m['content'] for m in relevant]
    assert "The quick brown fox" in contents
    assert "Jumps over the lazy dog" in contents

def test_get_recent_memories_when_no_query():
    mm = MemoryManager()
    
    for i in range(15):
        mm.add_memory(f"Memory {i}")
    
    recent = mm.get_relevant_memories("", limit=5)
    assert len(recent) == 5
    assert recent[0]['content'] == "Memory 10"
    assert recent[-1]['content'] == "Memory 14"

def test_save_and_load_memory():
    mm = MemoryManager()
    mm.add_memory("Saved memory 1")
    mm.add_memory("Saved memory 2")
    
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
        temp_path = f.name
    
    try:
        mm.save_memory(temp_path)
        
        mm2 = MemoryManager()
        mm2.load_memory(temp_path)
        
        assert len(mm2.memory_items) == 2
        assert mm2.memory_items[0]['content'] == "Saved memory 1"
        assert mm2.memory_items[1]['content'] == "Saved memory 2"
    finally:
        os.unlink(temp_path)

def test_clear_memory():
    mm = MemoryManager()
    mm.add_memory("Memory to clear")
    mm.add_memory("Another memory")
    
    assert len(mm.memory_items) == 2
    mm.clear_memory()
    assert len(mm.memory_items) == 0