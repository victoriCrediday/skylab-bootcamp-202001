function Checkbox(props) {

  const onChange = event => props.onChange(event, props.property)

  return (
    <section className="colors">
      {props.data.map((element, i) => {
        return (
          <label key={i} className="checkbox">
            <input key={i} onChange={onChange} name={element} type="checkbox"/>
            {` ${firstUppercase(element)}`}
          </label>
        )
      })
    }
    </section>
  )
}