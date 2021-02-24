/* eslint-disable react/no-string-refs */
import React from "react"
import PropTypes from "prop-types"
import { requestTimeout, clearRequestTimeout } from './utils'
import "./turnplate.scss"
const vw=93.34
const CTX_TRANSLATE_COE=1.44375*vw
const CTX_ARC_COE=1.4*vw
const CANVAS_COE=2.88750*vw
//const timeLine=[5,9,12,14,15]//圈数
const getTimeLine=(addRow=(3/6))=>{
  const targetTurn=11+addRow
  let currentPreTurn=0
  const preTimeLine=new Array(Math.floor(addRow/0.125)).fill(233).map((v,i)=>{
    if(i===0){
      currentPreTurn+=0.125+addRow%0.125
      return currentPreTurn
    }else{ currentPreTurn+=0.125
      return  currentPreTurn
    }
  })
  let currentTurn=currentPreTurn
const timeLine=new Array(104).fill(233).map((v,i)=>{
  if(i<(60)){
    currentTurn+=0.125
    return currentTurn
  }else{
    currentTurn+=(120-i)/60*0.125
    return currentTurn>targetTurn?targetTurn:currentTurn
  }
})
return [...preTimeLine,...timeLine]
}
const timeLine=getTimeLine()
export default class ReactTurnPlate extends React.Component {
  static propTypes = {
    // 奖项列表
    prizeList: PropTypes.array.isRequired,
    // 获奖Id
    awards: PropTypes.array,
    //点击旋转
    startValidator: PropTypes.func,
    // 转完之后的回调
    rotateFinish: PropTypes.func,
    rotateChance: PropTypes.number,
    // 点击按钮
    image_spin: PropTypes.string,
    //背景1
    background_1: PropTypes.string,
    //背景2
    background_2: PropTypes.string,
    //是否显示奖品的名字
    needShowItemName: PropTypes.bool,
    start: PropTypes.func
  }

  static defaultProps = {
    prizeList: [],
    needShowItemName: true
  }

  _getInitialState() {
    return {
      iniAwardsLength: 0,
      justRotate: true,
      lastIndex: 0,

      rotating: undefined,
      second:0,
    }
  }
  constructor() {
    super(...arguments)
    this.devicePixelRatio = window.devicePixelRatio || 2
    this.state = this._getInitialState()
  }
  componentDidMount() {
    this.draw()
  }
  draw(list) {
    const prizeList = list || this.props.prizeList
    const rotateDeg = 360 / prizeList.length / 2 + 90 // 扇形回转角度
    const canvas = document.getElementById("canvas")
    if (!canvas.getContext) {
      return
    }
    const ctx = canvas.getContext("2d")
    for (let i = 0; i < prizeList.length; i++) {
      ctx.save()
      ctx.beginPath()
      ctx.translate(CTX_TRANSLATE_COE * this.devicePixelRatio, CTX_TRANSLATE_COE * this.devicePixelRatio)
      ctx.moveTo(0, 0)
      ctx.rotate((((360 / prizeList.length) * i - rotateDeg) * Math.PI) / 180)
      ctx.arc(0, 0, CTX_ARC_COE * this.devicePixelRatio, 0, (2 * Math.PI) / prizeList.length, false)
      ctx.closePath()
      if (i % 2 == 0) {
        ctx.fillStyle = "#FFE996"
      } else {
        if (prizeList.length % 2 === 0) {
          ctx.fillStyle = "#FFE996"
        } else {
          ctx.fillStyle = "#FFE996"
        }
      }
      ctx.fill()
      ctx.lineWidth = 4
      ctx.strokeStyle = "#FEB63C"
      ctx.stroke()
      ctx.restore()
    }
  }
  onRotate=async()=>{
    //console.log('start?')
    if(this.state.rotating){ return }
    const result=await this.props.start()
    this.setState({rotating:result,second:1})
    const turntableEl=document.getElementById('turnplate')
    turntableEl.style.transform=`rotate(-${timeLine[1]}turn)`

  }
  transitionEnd=()=>{
    const {second}=this.state
    if(timeLine[second+1]){
      console.log(timeLine[second+1])
    const turntableEl=document.getElementById('turnplate')
    this.setState({second:second+1})
    turntableEl.style.transform=`rotate(-${timeLine[second+1]}turn)`
    }else{
      console.log('end')
      console.log(this.state.rotating)
    }
  }
  _getTurnPrizeList() {
    const { prizeList, needShowItemName } = this.props
    const turnplateList = []
    for (let i = 0; i < prizeList.length; i++) {
      const turnplateItem = (
        <li className="turnplate-item" data-no={i} key={i}>
          <div style={{ transform: `rotate(${i / prizeList.length}turn)` }}>
            <img alt='alt' src={prizeList[i].icon} style={prizeList[i].id === 'prizeId8' ? { marginTop: '8vw' } : {}} />
            {needShowItemName && prizeList[i].name ? (
              <div className="awardName" dangerouslySetInnerHTML={{ __html: prizeList[i].name }}></div>
            ) : null}
          </div>
        </li>
      )
      turnplateList.push(turnplateItem)
    }
    return <ul className="turnplate-list">{turnplateList}</ul>
  }
  render() {
    const { background_1, background_2, image_spin } = this.props
    const priceList = this._getTurnPrizeList()
    const { rotateChance } = this.props
    return (
      <div
        className={"turnplate-border-cover"}
        style={{
          backgroundImage: `url(${background_2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%"
        }}
      >
        <div
          className={"turnplate-border"}
          style={{
            backgroundImage: `url(${background_1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
        </div>
        <div
          className="turnplate-wrapper"
          id="turnplate"
          onTransitionEnd={this.transitionEnd}
        >
          <canvas
            className="turnplate"
            id="canvas"
            width={CANVAS_COE * this.devicePixelRatio}
            height={CANVAS_COE * this.devicePixelRatio}
          >
            Sorry,Explorer not support.
          </canvas>
          {priceList}
        </div>
        <div
          style={{
            backgroundImage: `url(${image_spin})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
          className="pointer"
          onClick={this.onRotate}
        >
          <div>
            <p>抽奖</p>
            <span className='chance'>
              (还剩{rotateChance}次)
            </span>
          </div>
        </div>
      </div>
    )
  }
}
