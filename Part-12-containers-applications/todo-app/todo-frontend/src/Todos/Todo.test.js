import '@testing-library/jest-dom';
import Todo from './Todo';
import { render, screen } from '@testing-library/react';

describe('Content visible', () => {
  test('renders content', () => {

    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();
    const todo = {
      text: 'This must be still false',
      done: false
    };

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    const element = screen.getByText('This must be still false');
    expect(element).toBeDefined();
  })
})