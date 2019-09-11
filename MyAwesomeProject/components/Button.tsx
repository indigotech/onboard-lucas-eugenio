import React, {Component} from 'react'
import { GestureResponderEvent } from 'react-native'
import styled  from 'styled-components/native'

interface ButtonProps {
  title: string
  onPress: (event : GestureResponderEvent) => void;
  disabled: boolean
}

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) { super(props) }

  render() {
    return(
      <ButtonBox
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        {this.props.disabled? <GrayText>{this.props.title}</GrayText> : <WhiteText>{this.props.title}</WhiteText>}
      </ButtonBox>
    )
  }
}

const ButtonBox = styled.TouchableOpacity`
  background-color: cadetblue
  height: 52px 
  align-items: center
  border-radius: 12px
  justify-content: center
`

const WhiteText = styled.Text`
  font-size: 16px
  color: white
`

const GrayText = styled.Text`
  font-size: 16px
  color: gray
`