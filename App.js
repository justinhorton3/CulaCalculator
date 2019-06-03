/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import InputNumberButton from './InputNumberButton';


const buttons = [
  ['MC', '(', ')', '^'],
  [ 'C', '+/-', '%', '√'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '00', '.', '+'],
  ['=']
];
export default class App extends Component {

  constructor() {
    super();
    this.initialState = { 
      displayValue: '0',
      operator: null,
      firstValue: '', 
      secondValue: '',
      nextValue: false
    }
    this.state = this.initialState;
  }
  
  renderButtons() { 
    let layouts = buttons.map((buttonRows, index) => {
      
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton 
                value={buttonItems}
                handleOnPress={this.handleInput.bind(this, buttonItems)}
                key={'btn-' + buttonIndex}/>
      });

      return <View style={styles.inputRow} key={'row-' + index }>{rowItem}</View>
    });

    return layouts;
  }

  handleInput = (input) => { 
    const { displayValue, operator, firstValue, secondValue, nextValue } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5': 
      case '6':
      case '7': 
      case '8': 
      case '9': 
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        });
    
        if( !nextValue) { 
          this.setState({
            firstValue: firstValue !== '' ? input : firstValue + input
          });
        } else  { 
          this.setState({ 
            secondValue: secondValue !== '' ? input : secondValue + input
          });
        }

        break;
      case '+':
      case '-': 
      case 'x': 
      case '÷':
        if ( !nextValue) {
          this.setState({
            nextValue: true,
            operator: input,
            displayValue: (operator !== null ? displayValue.substr(0, displayValue.length -1) : displayValue) + input  
          });
        } else {
          let formatOperator = (operator == 'x') ? '*' : (operator == '÷') ? '/' : operator
          let result = eval(firstValue + formatOperator + secondValue);

          this.setState({ 
            displayValue: result + input, 
            operator: input,
            firstValue: result,
            secondValue: '', 
            nextValue: true
          })
        }
        break;
      case '=': 
          let formatOperator = (operator == 'x') ? '*' : (operator == '÷') ? '/' : operator
          let result = eval(firstValue + formatOperator + secondValue);

          this.setState({ 
            displayValue: result, 
            operator: null,
            firstValue: result,
            secondValue: '', 
            nextValue: false
          })
        break;
      case '.':
          let dot = displayValue.toString().slice(-1); // Get the last character
          
          this.setState({
            displayValue: dot !== '.' ? displayValue + input : displayValue
          });
  
          if( !nextValue) { 
            this.setState({
              firstValue: firstValue + input
            });
          } else  { 
            this.setState({ 
              secondValue: secondValue + input
            });
          }
          break;
      case 'C':
      case 'MC':
        this.setState(this.initialState);
        break;
      default:
        this.setState({
          displayValue: 'NaN',
          operator: null,
          firstValue: '', 
          secondValue: '',
          nextValue: false
        });
        break;
    }
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: { 
    flex: 2, 
    backgroundColor: '#efefef',
    justifyContent: 'center'
  }, 
  inputContainer: {
    flex: 8, 
    backgroundColor: 'blue'
  },
  resultText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 80,
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    color:'orange'
  }
});
