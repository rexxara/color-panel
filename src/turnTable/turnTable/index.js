import ReactTurnPlate from "./reactTurnPlate";
import React from "react";
import image_spin from"./img/point.png"
import background_1 from "./img/plate.png"
import background_2 from  "./img/plate.png"
const data={
    prizeList:[{
        icon:'',
        id:1,
        name:'award1'
    },{
        icon:'',
        id:2,
        name:'award2'
    },{
        icon:'',
        id:3,
        name:'award3'
    },{
        icon:'',
        id:4,
        name:'award4'
    },{
        icon:'',
        id:5,
        name:'award5'
    },{
        icon:'',
        id:6,
        name:'award6'
    }],
    rotateChance:233
}
const play=()=>{
    return new Promise(res=>{
        setTimeout(() => {
            res({
                id:2
            })
        }, 1000);
    })
}
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            awards: []
        }
        this.start = this.start.bind(this)
        this.rotateFinish = this.rotateFinish.bind(this)
    }
    async start() {
        const {id} = await play()
        const award = data.prizeList.find(v => v.id === id)
        return award
        // this.setState({
        //     result: result,
        //     awards: [...this.state.awards, award]
        // });
    }

    rotateFinish() {
        this.props.handleEnd(this.state.result)
    }
    render() {
        const { awards } = this.state;
        const { prizeList, rotateChance } = data
        return (
            <div className="turntableCon">
                {prizeList && <div>
                    <ReactTurnPlate
                    prizeList={prizeList}
                    awards={awards}
                    needShowItemName={true}
                    disableFlash={true}
                    rotateChance={rotateChance}
                    image_spin={image_spin}
                    background_1={background_1}
                    background_2={background_2}
                    startValidator={()=>{
                        return true
                    }}
                    start={this.start}
                    rotateFinish={this.rotateFinish}
                />
                </div>}
            </div>
        )
    }
}

export default App