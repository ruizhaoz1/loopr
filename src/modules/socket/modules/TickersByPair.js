import React from 'react'
import PropTypes from 'prop-types';
import TickersByPairData from '../mocks/TickersByPair.json'
class TickerSocketContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      item:{}
    }
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.pair !== this.props.pair){
      const { socket } = this.context
      const options = {
        "contractVersion" : "v1.0",
        "market":nextProps.pair,
      }
      socket.emit('tickers_req',JSON.stringify(options))
    }
    return true
  }
  componentDidMount() {
    const { socket } = this.context
    const { pair } = this.props
    if(socket){
      const options = {
        "contractVersion" : "v1.2",
        "market":pair,
      }
      socket.emit('tickers_req',JSON.stringify(options))
      socket.on('tickers_res', (res)=>{
        console.log('ticker_res')
        res = JSON.parse(res)
        if(!res.error){
          this.setState({
            item:res.data
          })
        }
      })
    }
    if(!socket) {
      console.log('socket not connected')
    }
  }
  componentWillUnmount() {
    const { socket } = this.context
    if (!socket) {
      console.log('socket connection has not been established')
      return false
    }
    socket.off('tickers_res')
  }
  toggleFavor(){
    this.setState({
      item:{
        ...this.state.item,
        favored:!this.state.item.favored
      }
    })
    window.STORAGE.markets.toggleFavor(this.props.pair)
  }
  render() {
    const {children,...rest} = this.props
    const childProps = {
      ...rest,
      tickersByPair:{
        ...this.state.item,
        toggleFavor:this.toggleFavor.bind(this)
      }
    }
    const {render} = this.props
    if(render){
      return render.call(this,childProps)
    }
    return (
      <div>
         {
           React.Children.map(this.props.children, child => {
               return React.cloneElement(child, {...childProps})
           })
         }
      </div>
    )
  }
}
TickerSocketContainer.contextTypes = {
  socket: PropTypes.object.isRequired
};
export default TickerSocketContainer
