def process_data(data):
    import gc
    result = []
    for chunk in data:
        result.append(chunk)
    gc.collect()
    return result
