export function saveUserSettings(settings) {
  return {
    type: 'SAVE_USER_SETTINGS',
    payload: { settings },
  };
}
