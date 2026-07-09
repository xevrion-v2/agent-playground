from PIL import Image, ImageDraw, ImageFont
import imageio
import os

width, height = 900, 450
bg_color = (30, 30, 30)
bar_color = (45, 45, 45)
text_color = (220, 220, 220)
prompt_color = (100, 200, 100) # green
command_color = (200, 200, 100) # yellow
success_color = (100, 255, 100) # bright green

try:
    font = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 20)
    font_bold = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 20)
except Exception as e:
    font = ImageFont.load_default()
    font_bold = font

def draw_window(draw):
    draw.rectangle([(0, 0), (width, 30)], fill=bar_color)
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
        elif line.startswith("✓"):
            d.text((20, y), line, font=font_bold, fill=success_color)
        else:
            d.text((20, y), line, font=font, fill=text_color)
        y += 28
        
    if typed_cmd != "":
        d.text((20, y), "$ ", font=font_bold, fill=prompt_color)
        d.text((45, y), typed_cmd, font=font, fill=command_color)
        w = d.textlength(typed_cmd, font=font) if hasattr(d, 'textlength') else len(typed_cmd)*12
        d.rectangle([(45 + w + 2, y + 2), (45 + w + 12, y + 22)], fill=(200,200,200))
        
    frames.append(img)

cmd = "npm run test && npm run lint"
for i in range(len(cmd)+1):
    add_frame([], cmd[:i])
for _ in range(3):
    add_frame([], cmd)

lines = [
    "$ " + cmd,
    "> agent-playground@0.1.0 test",
    "> vitest run",
    ""
]
add_frame(lines)
for _ in range(3):
    add_frame(lines)

lines.append("✓ src/tests/all.test.ts (15 tests)")
lines.append("✓ Test Suites: 1 passed, 1 total")
lines.append("✓ Tests:       15 passed, 15 total")
add_frame(lines)
for _ in range(5):
    add_frame(lines)

lines.append("")
lines.append("> agent-playground@0.1.0 lint")
lines.append("> eslint .")
add_frame(lines)
for _ in range(5):
    add_frame(lines)

lines.append("✓ No linting errors found.")
lines.append("Done in 1.42s")

for _ in range(15):
    add_frame(lines)

imageio.mimsave("generic_demo.gif", frames, duration=0.1)
print("generic_demo.gif created successfully")
