mp.events.add("playerReady", (player) => {
    playerUtils.setDeafultComponents(player);
    playerUtils.setDeafultProps(player);
    playerUtils.setDeafultEyeColor(player);
    playerUtils.setDeafultFaceFeatures(player);
    playerUtils.setDeafultHeadOverlays(player);
    playerUtils.setDefaultHeadBlend(player);
});