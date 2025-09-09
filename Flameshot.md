# 🔥 Setting Flameshot as Default Screenshot Tool in Ubuntu

## 1. 🚀 Install Flameshot
If you don’t have it yet, run:
```bash
sudo apt update
sudo apt install flameshot
```

---

## 2. ❌ Disable Ubuntu’s Default Screenshot Shortcuts
1. Open **Settings → Keyboard → Keyboard Shortcuts**.  
2. Look for the **📸 Screenshots** section.  
3. Disable (or reassign) the default keys using `PrtSc`, `Shift+PrtSc`, `Alt+PrtSc`.

---

## 3. ⚙️ Create a Custom Shortcut for Flameshot
1. In **Settings → Keyboard → Keyboard Shortcuts**, scroll down.  
2. Click **“+” (Add Custom Shortcut)** ➕.  
3. Fill in the fields:  
   - **Name**: Flameshot 🔥  
   - **Command**:  
     ```bash
     flameshot gui
     ```
   - **Shortcut**: press the `PrtSc` key ⌨️.

---

## 4. 🧪 Test It
- Now pressing `PrtSc` will launch Flameshot in selection mode (`gui`).  

Optional commands for other behaviors:  
- 🌍 Full screen:  
  ```bash
  flameshot full -p ~/Pictures
  ```
- 🖼️ Active window:  
  ```bash
  flameshot screen
  ```

---

✅ Done! Flameshot is now your **default screenshot tool** in Ubuntu 🎉