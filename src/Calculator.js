import React, { Component } from 'react'
import { baseDef, requiredDef, guildbuff, determinationSetsValues, towerLevels } from './Data.js';

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
                <img src="https://summonerswarskyarena.info/wp-content/uploads/2019/06/unit_icon_0051_0_3.png" alt="Icaru icon" />
                <h1>Additional Defence from runes: {this.remainingDef}</h1>
                <form>
                    <label>Defence Glory Tower Level: </label>
                    <select value={this.state.defGloryTowerLevel} onChange={this.handleChange} name='defGloryTowerLevel'>
                        {
                            towerLevels.map((towerLevel) => {
                                return <option value={towerLevel} key={towerLevel}>{towerLevel}</option>
                            }
                            )
                        }
                    </select>
                    <br></br>
                    <label>Guild Buff Level: </label>
                    <select value={this.state.guildBuffValue} onChange={this.handleChange} name='guildBuffValue'>
                        {
                            Object.keys(guildbuff).map((key) => {
                                return <option value={guildbuff[key]} key={key} >{key}%</option>
                            })
                        }
                    </select>
                    <br></br>
                    <label>Number of Determination Sets: </label>
                    <select value={this.state.numberOfDeterminationSets} onChange={this.handleChange} name='numberOfDeterminationSets'>
                        {
                            determinationSetsValues.map((setNum) => {
                                return <option value={setNum} key={setNum}>{setNum}</option>
                            }
                            )
                        }
                    </select>
                </form>
            </div>
        )

    }

}