// Ensures only one <video> plays with sound at a time across the whole
// site. When a video unmutes, it registers itself here; if another video
// was already unmuted, that one gets muted automatically.
let current = null;

export function notifyUnmuted(element, onMuted) {
  if (current && current.element !== element) {
    current.element.muted = true;
    current.onMuted();
  }
  current = { element, onMuted };
}

export function notifyMuted(element) {
  if (current && current.element === element) {
    current = null;
  }
}
