import React, {Component} from 'react'
import styled  from 'styled-components/native'

interface FormProps {
  textTop: string
  validationFunction: (text: string) => string
  onEndEditing: (text: string) => void
  textBottom?: string
}

interface FormState {
  textBottom: string
}

export class Form extends Component<FormProps, FormState> {
  private textInput: string = ''

  constructor(props: FormProps) {
    super(props)
    this.state = {
      textBottom: ''
    }
  }

  render() {
    return(
      <FormView>
        <TextTop>{this.props.textTop}</TextTop>
        <FormBox
          autoCapitalize='none'
          onChangeText={this.handleTextChange}
          onEndEditing={this.handleEndEditing}
        />
        <TextBottom>{this.props.textBottom || this.state.textBottom}</TextBottom>
      </FormView>
    )
  }

  private handleTextChange = (text: string) => this.textInput = text
  
  private handleEndEditing = () => {
    const error: string = this.props.validationFunction(this.textInput)
    error ? this.props.onEndEditing('') : this.props.onEndEditing(this.textInput)
    this.setState({textBottom: error})
  }
}

const FormView = styled.View`
  align-self: stretch
`

const TextTop = styled.Text`
  font-size: 16px
  color: gray
  margin-bottom: 12px
  font-weight: bold
`

const FormBox = styled.TextInput`
  border: 1px
  border-color: gray
  border-radius: 12px
  color: black
  align-self: stretch
  font-size: 16px
  padding: 12px
`

const TextBottom = styled.Text`
  font-size: 12px
  color: red
  margin: 8px 0px 16px
`