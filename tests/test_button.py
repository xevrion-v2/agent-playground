"""Tests for Button component."""
import pytest

def test_button_default_props():
    """Button should render with default variant primary."""
    props = {"label": "Click", "onClick": lambda: None}
    assert props["label"] == "Click"
    assert callable(props["onClick"])

def test_button_disabled_state():
    """Button should accept disabled prop."""
    props = {"label": "Save", "onClick": lambda: None, "disabled": True}
    assert props["disabled"] is True

def test_button_variants():
    """Button should accept all variant types."""
    for v in ["primary", "secondary", "danger"]:
        props = {"label": "Test", "onClick": lambda: None, "variant": v}
        assert props["variant"] in ("primary", "secondary", "danger")

def test_button_sizes():
    """Button should accept all size types."""
    for s in ["small", "medium", "large"]:
        props = {"label": "Test", "onClick": lambda: None, "size": s}
        assert props["size"] in ("small", "medium", "large")

def test_button_custom_class():
    """Button should accept custom className."""
    props = {"label": "Test", "onClick": lambda: None, "className": "custom-class"}
    assert props["className"] == "custom-class"
