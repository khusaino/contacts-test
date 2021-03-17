
export const Nav = (props)=>{

  return(
    <>
    <nav>
    <div className="nav-wrapper">
      <span href="#" className="brand-logo">{props.title}</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {props.link}
      </ul>
    </div>
  </nav>
  </>
  )
}

