export default function reducer(state={
  sidebar: true,
  header: true,
  footer: true,
}, action) {

  switch (action.type) {
    case "LAYOUT_SIDEBAR_VISIBLE": {
      return {...state, sidebar: true}
    }

    case "LAYOUT_SIDEBAR_HIDDEN": {
      return {...state, sidebar: false}
    }

    case "LAYOUT_HEADER_VISIBLE": {
      return {...state, header: true}
    }
    
    case "LAYOUT_HEADER_HIDDEN": {
      return {...state, header: false}
    }

    case "LAYOUT_FOOTER_VISIBLE": {
      return {...state, footer: true}
    }

    case "LAYOUT_FOOTER_HIDDEN": {
      return {...state, footer: false}
    }
  }
  return state;
}

