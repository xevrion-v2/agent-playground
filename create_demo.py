from PIL import Image, ImageDraw
import imageio
import sys

frames = []
lines = [
    "$ npx tsx src/piExact.ts",
    "Initializing Chudnovsky algorithm...",
    "Allocating BigInt precision: 10,000 digits",
    "Computing series terms: [==========] 100%",
    "Finalizing Newton-Raphson integer square root...",
    "Pi = 3.141592653589793238462643383279502884197169399375105820974944...",
    "Computation complete in 0.42s"
]

width, height = 800, 300
bg_color = (30, 30, 30)
fg_color = (200, 200, 200)

current_text = []

for line in lines:
    current_text.append(line)
    img = Image.new('RGB', (width, height), color=bg_color)
    d = ImageDraw.Draw(img)
    y = 20
    for t in current_text:
        d.text((20, y), t, fill=fg_color)
        y += 20
    for _ in range(5):
        frames.append(img)

for _ in range(15):
    frames.append(frames[-1])

imageio.mimsave("demo.gif", frames, duration=0.2)
print("demo.gif created successfully")
