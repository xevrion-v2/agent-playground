import numpy as np
import pytest
from medxai import crop_roi

def test_crop_roi_integer_coordinates():
    image = np.random.rand(100, 100)
    result = crop_roi(image, 10, 20, 30, 40)
    assert result.shape == (40, 30)

def test_crop_roi_float_coordinates():
    image = np.random.rand(100, 100)
    result = crop_roi(image, 10.5, 20.7, 30.2, 40.8)
    assert result.shape == (41, 30)

def test_crop_roi_clamp():
    image = np.random.rand(100, 100)
    result = crop_roi(image, -10, -20, 30, 40, clamp=True)
    assert result.shape == (20, 30)