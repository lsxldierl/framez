# Framez

Framez is an animation plugin for Roblox Studio. Get it from the Creator Store, then open it from the Plugins tab.

This repo has the **Framez Helper** and the **Framez Manual**.

Manual: https://lsxldierl.github.io/framez/

## Framez Helper

A free Windows app that runs next to Studio. You don't need it for Framez, but it unlocks:

- video reference: scrub a recording frame by frame next to your animation (beats and sound hits too)
- joints from video: pose a rig from someone in a video
- lip sync to a voice line
- face capture with your webcam
- exporting your animation as an MP4 or PNG frames
- the Blender link (the Framez tab in Blender 4.2+)
- a backup of every save on your disk

### Install

Windows 10 or 11, 64-bit. Once per PC, no admin needed.

1. Download `FramezHelperSetup-<version>.exe` from the [latest release](https://github.com/lsxldierl/framez/releases/latest).
2. Run it. If Windows says "Windows protected your PC", click **More info**, then **Run anyway**.
3. On the **Clip folder** page, pick the folder your videos are in.
4. Using Blender? Leave **Add the Framez tab to Blender** ticked, and close Blender first.
5. In Studio, open Framez, then **View > Windows > Reference video**. The first time, Studio asks if Framez can
   connect to 127.0.0.1. Hit allow.

It installs just for your Windows user and starts with Windows. There's no window, it just sits in the background
and only talks to programs on your own PC (127.0.0.1, port 34880). If Framez says the Helper isn't running, start
**Framez Helper** from the Start menu.

### Uninstall

Windows **Settings > Apps > Framez Helper > Uninstall**. That also takes the Framez tab out of Blender.

### Check a download

Every release has `SHA256SUMS.txt` with the checksum of each file.

## Licences

The Helper includes other open-source software; their licences are in `THIRD_PARTY_NOTICES.txt` and the `licenses`
folder where the Helper is installed. FFmpeg is used under the LGPL 2.1: its source and the script it was built with
are attached to every release. The Blender add-on is GPL-3.0-or-later.
