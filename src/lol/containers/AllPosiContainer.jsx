import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import OnePosiRow from '../components/OnePosiRow'
import RowHerosContainer from '../containers/RowHerosContainer'
import JumbotronContainer from '../containers/JumbotronContainer'
import PopupPage from '../components/PopupPage'

import actionCreators from '../actions/hero-action-creators'

import '../res/all-posi-container.less'

const positionType = {
  top: 'TOP 上路',
  jungle: 'JUNGLE 打野',
  mid: 'Mid 中单',
  adc: 'ADC 物理输出核心',
  support: 'SUPPORT 辅助'
}

class AllPosiContainer extends React.Component {
  static propTypes = {
    hero: PropTypes.objectOf(Immutable.Map).isRequired,
    models: PropTypes.objectOf(Immutable.Map).isRequired,
    close: PropTypes.func.isRequired
  }

  render() {
    // const obj = this.props.models.getIn(['top','heros',1,'title'])
    const models = this.props.models
    const selectedPosition = this.props.hero.get('selectedPosition')
    const reactElements = models.map((model, key) => {
      // console.log(model.get('heros'))
      const title = positionType[key]
      const hasSelection = key === selectedPosition
      const detailBar = hasSelection ? (
        <PopupPage close={this.props.close}>
          <JumbotronContainer />
        </PopupPage>
      ) : null
      return (
        <OnePosiRow
          hasSelection={hasSelection}
          key={key}
          title={title}
          count={model.get('count')}
          detailBar={detailBar}
        >
          <RowHerosContainer
            heros={model.get('heros')}
            hasSelection={hasSelection}
            position={key}
          />
        </OnePosiRow>
      )
    }).toArray()

    return (
      <div className="all-posi-ct">
        {reactElements}
      </div>
    )
  }
}

const mapStateToProps = state => ({ hero: state.get('hero') })
const mapDispatchToProps = dispatch => ({
  close: () => {
    dispatch(actionCreators.selectHero({ heroID: null, position: null }))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(AllPosiContainer)
