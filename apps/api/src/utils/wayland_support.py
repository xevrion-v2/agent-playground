"""
Wayland support for autokey.
Uses pynput for keyboard and mouse events on Wayland.
"""

from pynput import keyboard
from pynput import mouse

class WaylandSupport:
    """Wayland implementation for autokey."""
    
    def __init__(self):
        self.keyboard_listener = None
        self.mouse_listener = None
    
    def start_keyboard_listener(self, on_press, on_release):
        """Start listening to keyboard events."""
        self.keyboard_listener = keyboard.Listener(
            on_press=on_press,
            on_release=on_release
        )
        self.keyboard_listener.start()
    
    def start_mouse_listener(self, on_click, on_move, on_scroll):
        """Start listening to mouse events."""
        self.mouse_listener = mouse.Listener(
            on_click=on_click,
            on_move=on_move,
            on_scroll=on_scroll
        )
        self.mouse_listener.start()
    
    def stop(self):
        """Stop all listeners."""
        if self.keyboard_listener:
            self.keyboard_listener.stop()
        if self.mouse_listener:
            self.mouse_listener.stop()
    
    @staticmethod
    def is_wayland():
        """Check if running on Wayland."""
        try:
            import os
            return os.environ.get('XDG_SESSION_TYPE') == 'wayland'
        except:
            return False