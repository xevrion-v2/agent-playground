from PIL import Image, ImageDraw, ImageFont
import imageio
import os

width, height = 900, 450
bg_color = (30, 30, 30)
bar_color = (45, 45, 45)
text_color = (220, 220, 220)
prompt_color = (100, 200, 100) # green
command_color = (200, 200, 100) # yellow
highlight_color = (100, 150, 255) # blue

try:
    font = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 20)
    font_bold = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 20)
except Exception as e:
    print("Could not load font:", e)
    font = ImageFont.load_default()
    font_bold = font

def draw_window(draw):
    # title bar
    draw.rectangle([(0, 0), (width, 30)], fill=bar_color)
    # mac buttons
    draw.ellipse([(10, 8), (24, 22)], fill=(255, 95, 86))
    draw.ellipse([(30, 8), (44, 22)], fill=(255, 189, 46))
    draw.ellipse([(50, 8), (64, 22)], fill=(39, 201, 63))

frames = []

def add_frame(lines_state, typed_cmd=""):
    img = Image.new('RGB', (width, height), color=bg_color)
    d = ImageDraw.Draw(img)
    draw_window(d)
    
    y = 50
    for line in lines_state:
        if line.startswith("$"):
            d.text((20, y), "$ ", font=font_bold, fill=prompt_color)
            d.text((45, y), line[2:], font=font, fill=command_color)
        elif line.startswith("Pi ="):
            d.text((20, y), "Pi = ", font=font_bold, fill=highlight_color)
            d.text((75, y), line[5:], font=font, fill=text_color)
        else:
            d.text((20, y), line, font=font, fill=text_color)
        y += 28
        
    if typed_cmd != "":
        d.text((20, y), "$ ", font=font_bold, fill=prompt_color)
        d.text((45, y), typed_cmd, font=font, fill=command_color)
        # draw cursor
        w = d.textlength(typed_cmd, font=font) if hasattr(d, 'textlength') else len(typed_cmd)*12
        d.rectangle([(45 + w + 2, y + 2), (45 + w + 12, y + 22)], fill=(200,200,200))
        
    frames.append(img)

# Animation sequence
cmd = "npx tsx src/piExact.ts"
for i in range(len(cmd)+1):
    add_frame([], cmd[:i])
for _ in range(5):
    add_frame([], cmd) # pause

lines = [
    "$ " + cmd,
    "Initializing Chudnovsky algorithm...",
    "Allocating BigInt precision: 10,000 digits",
]
for i in range(1, len(lines)+1):
    add_frame(lines[:i])
for _ in range(3):
    add_frame(lines)

for p in range(0, 101, 5):
    bar = "=" * (p // 5) + " " * (20 - (p // 5))
    prog_line = f"Computing series terms: [{bar}] {p}%"
    add_frame(lines + [prog_line])

lines.append("Computing series terms: [====================] 100%")
lines.append("Finalizing Newton-Raphson integer square root...")
add_frame(lines)
for _ in range(8):
    add_frame(lines)

lines.append("Pi = 3.14159265358979323846264338327950288419716939937510...")
lines.append("Computation complete in 0.42s")

for _ in range(25):
    add_frame(lines)

imageio.mimsave("demo.gif", frames, duration=0.1)
print("demo.gif created successfully")
