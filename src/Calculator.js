import React, { Component } from 'react'
import { baseDef, requiredDef, guildbuff, determinationSetsValues, towerLevels } from './Data.js';
import icaruImage from './media/images/icaru_icon.png'

export class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defGloryTowerLevel: 0,
            guildBuffValue: 0,
            numberOfDeterminationSets: 0
        };
    }

    remainingDef;

    componentDidMount = () => {
        this.updateRemainingDef();
    }

    handleChange = (event) => {
        const { target: { name, value } } = event
        this.setState({ [name]: value }, () => {
            console.log(this.state)
            this.updateRemainingDef()
        });

    }

    updateRemainingDef = () => {
        this.remainingDef = Math.round((requiredDef - baseDef) - (0.08 * this.state.numberOfDeterminationSets * baseDef) - ((this.state.defGloryTowerLevel * 0.01) * baseDef)
            - (baseDef * this.state.guildBuffValue));
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <img src={icaruImage} alt="Icaru icon" />
                <form className="">
                    <div className="container">
                        <div className="row">
                            <div className="form-group col-lg-4">
                                <label>Defence Glory Tower Level: </label>
                                <select className="form-control form-control-sm" value={this.state.defGloryTowerLevel} onChange={this.handleChange} name='defGloryTowerLevel'>
                                    {
                                        towerLevels.map((towerLevel) => {
                                            return <option value={towerLevel} key={towerLevel}>{towerLevel}</option>
                                        }
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Guild Buff Level: </label>
                                <select className="form-control form-control-sm" value={this.state.guildBuffValue} onChange={this.handleChange} name='guildBuffValue'>
                                    {
                                        Object.keys(guildbuff).map((key) => {
                                            return <option value={guildbuff[key]} key={key} >{key}%</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Number of Determination Sets: </label>
                                <select className="form-control form-control-sm" value={this.state.numberOfDeterminationSets} onChange={this.handleChange} name='numberOfDeterminationSets'>
                                    {
                                        determinationSetsValues.map((setNum) => {
                                            return <option value={setNum} key={setNum}>{setNum}</option>
                                        }
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </form>
                <h1>Additional Defence from runes</h1>
                <h2>{this.remainingDef}</h2>
            </div>
        )

    }

}