export function loginUser() {
  return {
    type: "LOGIN_USER_FULFILLED",
    payload: {
      username: 'will',
      name: "Will",
      usertype: 'normal user',
    }
  }
}