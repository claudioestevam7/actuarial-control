import pynput.mouse 

mouse = pynput.mouse.Controller()
Button_m = pynput.mouse.Button
Listener = pynput.mouse.Listener

print(mouse.position)
#mouse.position = (1000,500)

#mouse.move(100,100)

#mouse.click(Button_m.right)
#mouse.click(Button_m.left)
#mouse.click(Button_m.left,2)

#mouse.press(Button_m.left)
#mouse.release(Button_m.left)

#mouse.scroll(0,-100)


# def on_scroll(x, y, dx, dy):
#     mouse.click(Button_m.left)
#     print('Scrolled {0}'.format(
#         (x, y)))

# keyboard.press(Key.ctrl)
# keyboard.press(Key.alt)
# keyboard.press(Key.delete)
# keyboard.release(Key.ctrl)
# keyboard.release(Key.alt)
# keyboard.release(Key.delete)

# from pynput.keyboard import Key, Controller
# kb = Controller()
# kb.press(Key.up) # Presses "up" key
# kb.release(Key.up) # Releases "up" key
# kb.press(Key.left) # Presses "left" key
# kb.release(Key.left) #etc..
# kb.press(Key.right)
# kb.release(Key.right)
# kb.press(Key.down)
# kb.release(Key.down)


def click(x,y,button_m, pressed):
    print(x,y,button_m, pressed)
    #if not pressed:
    #    return False

def move(x,y):
    print(x,y)
    if y==14:
        return False

listener = Listener(on_click=click,on_move=move)
listener.start()
listener.join()
listener.stop()