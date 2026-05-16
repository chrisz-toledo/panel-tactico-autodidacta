# 🖥️ Setup HP Arch Linux — Trinchera de Práctica
## Configuración Completa para el Equipo de Hacking y Desarrollo

---

## 📋 CHECKLIST DE INSTALACIÓN

### ✅ Paso 0: Pre-instalación (en tu Mac M4)
- [ ] Descargar ISO de Arch Linux: https://archlinux.org/download/
- [ ] Crear USB bootable:
  ```bash
  # En Mac
  diskutil list                    # Identificar USB (ej: /dev/disk2)
  diskutil unmountDisk /dev/disk2  # Desmontar
  sudo dd if=arch.iso of=/dev/rdisk2 bs=1m status=progress
  ```
- [ ] Respaldar datos importantes del HP

---

## 🔧 INSTALACIÓN BASE DE ARCH LINUX

### 1. Boot desde USB
```
1. Insertar USB en HP
2. Encender y presionar F12 (o ESC → Boot Menu)
3. Seleccionar USB UEFI
4. Aparece prompt: root@archiso ~ #
```

### 2. Conectar a Internet
```bash
# WiFi (si no tienes cable)
iwctl
[iwd]# device list                    # Ver interfaz (ej: wlan0)
[iwd]# station wlan0 scan
[iwd]# station wlan0 get-networks    # Ver redes
[iwd]# station wlan0 connect "TU_WIFI"
[iwd]# exit

# Verificar conexión
ping archlinux.org
```

### 3. Particionar Disco
```bash
# Identificar disco
lsblk

# Ejemplo: /dev/sda o /dev/nvme0n1
# Usando cfdisk (más fácil)
cfdisk /dev/sda

# Crear particiones:
# 1. EFI: 512MB, tipo EFI System
# 2. SWAP: 4-8GB, tipo Linux swap  
# 3. ROOT: Resto, tipo Linux filesystem
```

### 4. Formatear Particiones
```bash
# EFI
mkfs.fat -F32 /dev/sda1

# SWAP
mkswap /dev/sda2
swapon /dev/sda2

# ROOT (ext4)
mkfs.ext4 /dev/sda3
```

### 5. Montar y Instalar Base
```bash
# Montar
mount /dev/sda3 /mnt
mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi

# Instalar sistema base
pacstrap -K /mnt base base-devel linux linux-firmware vim nano sudo grub efibootmgr networkmanager git

# Generar fstab
genfstab -U /mnt >> /mnt/etc/fstab
```

### 6. Configurar Sistema
```bash
# Entrar al sistema instalado
arch-chroot /mnt

# Zona horaria
ln -sf /usr/share/zoneinfo/America/Guayaquil /etc/localtime
hwclock --systohc

# Locale
vim /etc/locale.gen
# Descomentar: en_US.UTF-8 UTF-8 y es_ES.UTF-8 UTF-8
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf

# Hostname
echo "trinchera-hp" > /etc/hostname

# Hosts
cat >> /etc/hosts << EOF
127.0.0.1   localhost
::1         localhost
127.0.1.1   trinchera-hp
EOF

# Password root
passwd

# Crear usuario
groupadd sudo
useradd -m -G sudo -s /bin/bash tu_usuario
passwd tu_usuario

# Permitir sudo sin password (mientras configuras)
echo "%sudo ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/sudo-group
```

### 7. Bootloader (GRUB)
```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

### 8. Finalizar Instalación
```bash
# Habilitar NetworkManager
systemctl enable NetworkManager

# Salir, desmontar, reiniciar
exit
umount -R /mnt
reboot
```

---

## 🛠️ POST-INSTALACIÓN (como usuario normal)

### 1. Conectar WiFi
```bash
nmcli device wifi list
nmcli device wifi connect "TU_WIFI" password "TU_PASS"
```

### 2. Instalar Yay (AUR Helper)
```bash
sudo pacman -S --needed git base-devel
mkdir ~/builds && cd ~/builds
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

### 3. Instalar Entorno Gráfico (Opciones)

#### Opción A: Minimal (recomendado para AEGIS)
```bash
# Window Manager: i3 (ligero, keyboard-driven)
sudo pacman -S i3-wm i3status dmenu rxvt-unicode xorg-xinit

# Iniciar X
startx
```

#### Opción B: Desktop completo
```bash
# XFCE (balance entre ligero y completo)
sudo pacman -S xfce4 xfce4-goodies lightdm lightdm-gtk-greeter
sudo systemctl enable lightdm
```

### 4. Instalar Herramientas de Desarrollo
```bash
# Python
sudo pacman -S python python-pip python-virtualenv

# C/C++
sudo pacman -S gcc gdb make cmake

# JavaScript/Node
sudo pacman -S nodejs npm

# Editores
sudo pacman -S vim neovim
yay -S visual-studio-code-bin

# Git tools
sudo pacman -S git lazygit

# Terminal multiplexer
sudo pacman -S tmux
```

---

## 🎯 HERRAMIENTAS ESPECÍFICAS PARA CADA FASE

### FASE 1: Fundamentos (CS50, Python, Linux)
```bash
# CS50 tools
sudo pacman -S clang valgrind
yay -S check50-bin  # Instalador CS50 (si existe)

# Python específico
pip install --user check50 submit50 style50

# Documentación offline
sudo pacman -S man-pages man-db
```

### FASE 2: Pregrado (Algoritmos, Web, DB)
```bash
# Flask/Django
pip install --user flask django fastapi

# Bases de datos
sudo pacman -S postgresql sqlite redis

# Docker (contenedores)
sudo pacman -S docker docker-compose
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Postman alternative
yay -S insomnia
```

### FASE 3: Seguridad (Pentesting, HTB)
```bash
# Herramientas básicas de seguridad
sudo pacman -S nmap wireshark-cli netcat openssh openssl

# Web security
sudo pacman -S burpsuite community?  # Verificar AUR
yay -S burpsuite

# Password cracking
sudo pacman -S john hashcat

# Forensics
sudo pacman -S binwalk foremost

# TryHackMe/HackTheBox
pip install --user pwntools requests beautifulsoup4

# Reverse engineering
sudo pacman -S ghidra radare2

# VPN para HTB
sudo pacman -S openvpn
```

### FASE 4: IA & ML
```bash
# PyTorch (CPU primero, luego GPU si tienes NVIDIA)
pip install --user torch torchvision torchaudio

# TensorFlow
pip install --user tensorflow

# Jupyter
pip install --user jupyterlab notebook ipykernel

# HuggingFace
pip install --user transformers datasets accelerate

# Ollama (LLMs locales)
curl -fsSL https://ollama.com/install.sh | sh

# Verificar modelos
ollama pull llama3.2
ollama pull mistral
```

---

## 🔗 SINCRONIZACIÓN CON MAC M4 (AEGIS)

### Opción 1: Git (Recomendado)
```bash
# En Mac M4: crear repo de dotfiles
cd ~
git init dotfiles
cd dotfiles

# Agregar configs importantes
cp ~/.bashrc .
cp ~/.vimrc .
cp ~/.tmux.conf .
cp ~/.config/i3/config ./i3/

# Subir a GitHub
git add .
git commit -m "Initial dotfiles"
git remote add origin https://github.com/tuusuario/dotfiles.git
git push -u origin main
```

```bash
# En HP Arch: descargar
git clone https://github.com/tuusuario/dotfiles.git
cd dotfiles
./install.sh  # Script que linkea configs
```

### Opción 2: Syncthing (Sync continuo)
```bash
# En ambas máquinas
sudo pacman -S syncthing
systemctl --user enable syncthing
systemctl --user start syncthing

# Abrir http://localhost:8384 en ambas
# Configurar carpetas sync:
# - ~/Documents/AEGIS
# - ~/projects
# - ~/notes
```

### Opción 3: Cloud (Simple)
```bash
# Instalar cliente
yay -S dropbox  # o google-drive-ocamlfuse

# Alternativa: rclone para cualquier cloud
sudo pacman -S rclone
rclone config  # Configurar Google Drive

# Sync manual
rclone sync gdrive:AEGIS ~/AEGIS
```

---

## 📝 WORKFLOW ENTRE MAC Y HP

### Mac M4 = Zona de Producción
- 📺 Videos (CS50, cursos)
- 📖 Lectura (PDFs, documentación)
- ✍️ Planificación (AEGIS v4)
- 🎵 Audio Neural (binaural beats)
- 🤖 LLMs locales (Ollama, Mistral)
- 📝 Notas largas (Obsidian/Notion)

### HP Arch = Trinchera
- 💻 Codear (VS Code/Vim)
- 🐛 Debugging (gdb, pdb)
- 🛡️ Hacking labs (HTB, TryHackMe)
- 🔧 System administration
- 🧪 Experimentos (VMs, containers)
- 📝 Scripts rápidos, automation

### Sync diario
```bash
# En Mac: exportar progreso AEGIS
# (Backup JSON descargado desde browser)
cp ~/Downloads/aegis-v4-backup-*.json ~/AEGIS/backups/

# En HP: importar
# (Subir a AEGIS v4 desde browser)
```

---

## 🎵 AUDIO EN HP ARCH

```bash
# Instalar PipeWire (audio moderno)
sudo pacman -S pipewire pipewire-pulse pipewire-alsa wireplumber

# Habilitar
systemctl --user enable pipewire pipewire-pulse wireplumber
systemctl --user start pipewire pipewire-pulse wireplumber

# AEGIS v4 usa Web Audio API (funciona en cualquier browser)
# Solo necesitas Firefox o Chromium
sudo pacman -S firefox chromium
```

---

## 🚀 COMANDOS RÁPIDOS POST-INSTALACIÓN

```bash
# Actualizar sistema
sudo pacman -Syu

# Buscar paquetes
pacman -Ss nombre

# Instalar
sudo pacman -S paquete

# Desinstalar
sudo pacman -R paquete

# Limpiar cache
sudo pacman -Sc

# Ver logs
journalctl -xe

# Ver espacio
df -h

# Ver memoria
free -h
```

---

## 🆘 TROUBLESHOOTING

### No hay WiFi después de instalar
```bash
# Verificar que NetworkManager está corriendo
systemctl status NetworkManager

# Si no está activo:
sudo systemctl enable NetworkManager
sudo systemctl start NetworkManager

# Conectar manualmente
nmcli device wifi list
nmcli device wifi connect "SSID" password "PASS"
```

### Grub no aparece / boot falla
```bash
# Desde USB live (arch-chroot)
mount /dev/sda3 /mnt
mount /dev/sda1 /mnt/boot/efi
arch-chroot /mnt

# Reinstalar grub
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

### Pantalla negra en X/i3
```bash
# Verificar drivers
lspci | grep -i vga

# Instalar drivers Intel (común en HP)
sudo pacman -S xf86-video-intel

# O drivers genérico VESA (fallback)
sudo pacman -S xf86-video-vesa

# Regenerar xorg config
Xorg -configure
```

---

## ✅ CHECKLIST FINAL

Después de instalar, verifica:

- [ ] `ping google.com` funciona
- [ ] `git --version` devuelve versión
- [ ] `python3 --version` devuelve versión
- [ ] `code` abre VS Code
- [ ] `startx` abre i3/XFCE
- [ ] Puedes abrir AEGIS v4 en Firefox/Chromium
- [ ] Audio funciona (probar con `speaker-test`)
- [ ] Syncthing o rclone configurado con Mac

---

## 📚 RECURSOS ARCH LINUX

- Wiki oficial: https://wiki.archlinux.org/
- Installation Guide: https://wiki.archlinux.org/title/Installation_guide
- AUR Packages: https://aur.archlinux.org/
- Arch Reddit: https://www.reddit.com/r/archlinux/

---

*Configuración para AEGIS v4.0 — Sistema de Estudio Autodidacta*
