

const Pagination = ({pc,apn,hc}) => {
    return (
        <div className="btn-paginacao">
            <ul>
              {new Array(pc).fill(0).map((item,index) => {
                return (
                  <li key={index}>
                    <label className={apn === index+1 ? 'active' : ''} onClick={() => hc(index+1)}>{index+1}</label>
                  </li>
                )
              })}
            </ul>
        </div>
    )
}

export default Pagination