import React, { Component } from 'react'

export class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defGloryTowerLevel: 0,
            guildBuffValue: 0,
            numberOfDeterminationSets: 0
        };
    }

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

    baseDef = 736;
    requiredDef = 3301;
    towerLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    determinationSetsValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    guildbuff = {
        0: 0,
        3: 0.03,
        5: 0.05
    }
    remainingDef;

    updateRemainingDef = () => {
        this.remainingDef = Math.round((this.requiredDef - this.baseDef) - (0.08 * this.state.numberOfDeterminationSets * this.baseDef) - ((this.state.defGloryTowerLevel * 0.02) * this.baseDef)
            - (this.baseDef * this.state.guildBuffValue));
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h1>Defence Required: {this.remainingDef}</h1>
                <form>
                    <label>Defence Glory Tower Level: </label>
                    <select value={this.state.defGloryTowerLevel} onChange={this.handleChange} name='defGloryTowerLevel'>
                        {
                            this.towerLevels.map((towerLevel) => {
                                return <option value={towerLevel} key={towerLevel}>{towerLevel}</option>
                            }
                            )
                        }
                    </select>
                    <br></br>
                    <label>Guild Buff Level: </label>
                    <select value={this.state.guildBuffValue} onChange={this.handleChange} name='guildBuffValue'>
                        {
                            Object.keys(this.guildbuff).map((key) => {
                                return <option value={this.guildbuff[key]} key={key} >{key}%</option>
                            })
                        }
                    </select>
                    <br></br>
                    <label>Number of Determination Sets: </label>
                    <select value={this.state.numberOfDeterminationSets} onChange={this.handleChange} name='numberOfDeterminationSets'>
                        {
                            this.determinationSetsValues.map((setNum) => {
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