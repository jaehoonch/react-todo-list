import React, { Component } from 'react';
import './App.css';
import PageTemplate from './components/PageTemplate/PageTemplate';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const initialTodos = new Array(500).fill(0).map(
  (foo, index) => ({id: index, text: `일정 ${index}`, done:false})
);

class App extends Component {
  state = {
    input: '', // input 값
    // 일정 데이터 초깃값
    todos: initialTodos,
    // todos: [
    //   { id:0, text: '리액트 공부하기', done: true},
    //   { id:1, text: '컴포넌트 스타일링 해보기', done: false}
    // ]
  }

  // 일정 데이터 안에 들어가는 id 값
  id= 1
  getId = () => {
    return ++this.id; // 현재 값에서 1을 더한 값을 반환
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({
      input: value
    });
  }

  // 새 데이터 추가
  handleInsert = () => {
    const { todos, input } = this.state;

    // 새 데이터 객체 만들기
    const newTodo = {
      text: input,
      done:false,
      id: this.getId()
    };

    // 배열 안에 새 데이터를 집어넣습니다.
    this.setState({
      todos: [...todos, newTodo],
      input: ''
    });
  }

  // todo 아이템 토클하기
  handleToggle = (id) => {
    // id로 배열의 인덱스를 찾습니다.
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    // 찾은 데이터의 done 값을 반전시킵니다.
    const toggled = {
      ...todos[index],
      done: !todos[index].done
    }

    // slice를 사용하여 우리가 찾은 index 전후의 데이터들을 복사합니다.
    // 그리고 그 사이에는 변경된 todo 객체를 넣어 줍니다.
    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    })
  }

  // 선택된 id를 배열에서 제거합니다.
  handleRemove = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    // slice로 전후 데이터를 복사하고, 우리가 찾은 index는 제외시킵니다.
    this.setState({
      todos: [
        ...todos.slice(0, index),
        ...todos.slice(index + 1, todos.length)
      ]
    })
  }

  render() {
    const {input, todos} = this.state;
    const {
      handleChange,
      handleInsert,
      handleToggle,
      handleRemove
    } = this;

    return (
      <PageTemplate>
        <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
        <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </PageTemplate>
    );
  }
}

export default App;
