# Framez

Framez is an animation plugin for Roblox Studio. Get it from the Creator Store, then open it from the Plugins tab.

This repository has the **Framez Helper** and the **Framez guide**.

Guide: https://lsxldierl.github.io/framez/

## Framez Helper

A free Windows app that runs beside Studio. Framez works without it; the Helper adds:

- video reference: play a recording frame by frame beside your animation, with its beats and sound hits
- joints from video: pose a rig from a person in a video
- lip sync timed to a voice line
- face capture from a webcam
- exporting an animation as an MP4 or PNG frames
- the link to Blender (the Framez tab in Blender 4.2 and newer)
- a copy of every save on disk

### Install

Windows 10 or 11, 64-bit. Once per PC, no admin rights needed.

1. Download `FramezHelperSetup-1.4.0.exe` from the [latest release](https://github.com/lsxldierl/framez/releases/latest).
2. Run it. If Windows says "Windows protected your PC", click **More info**, then **Run anyway**.
3. On the **Clip folder** page, pick the folder your videos are in.
4. If you use Blender, leave **Add the Framez tab to Blender** ticked, and close Blender first.
5. In Studio, open Framez, then **View > Windows > Reference video**. The first time, Studio asks whether Framez may
   connect to 127.0.0.1: allow it.

It installs for the current Windows user and starts with Windows. It has no window: it waits in the background and
answers only programs on this PC (127.0.0.1, port 34880). If Framez says the Helper is not running, start
**Framez Helper** from the Start menu.

### Uninstall

Windows **Settings > Apps > Framez Helper > Uninstall**. It also takes the Framez tab out of Blender.

### Check a download

Each release has `SHA256SUMS.txt` with the checksum of every file in it.

## Licences

The Helper includes other open-source software; their licences are in `THIRD_PARTY_NOTICES.txt` and the `licenses`
folder where the Helper is installed. FFmpeg is used under the LGPL 2.1: its source and the script it was built with
are attached to every release. The Blender add-on is GPL-3.0-or-later.
