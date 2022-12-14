import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import { DeleteIcon } from '../components/icons/deleteIcon'
import Input from '../components/Input'
import ToDoCard from '../components/todoCard'
import './todo.scss'

const Todo = () => {

    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [searchText, setSearchText] = useState("")
    const [todos, setTodos] = useState([])
    let debounceTimer = null

    useEffect(() => {
        callTodDoApi()
    }, [])

    useEffect(() => {
        if (searchText !== '') {
            setTodos(() => data.filter(todo => todo.title.includes(searchText)))
        }
        else {
            setTodos([...data])
        }
    }, [data])

    const callTodDoApi = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const data = await response.json()
            // const splicedData = data.splice(0, 5)
            // setData(splicedData)
            setData(data)
            setTodos(data)
        }
        catch (error) {
            console.log('api error')
        }
    }

    const onClickCheckBox = (e, id) => {
        let toDoObjIndex = data.findIndex((toDo) => {
            return toDo.id === id
        })
        let toDoObj = [...data]
        toDoObj[toDoObjIndex].completed = e.target.checked
        setData(toDoObj)
    }

    const onChange = (e) => {
        setInputValue(e.target.value)
    }

    const addToDo = () => {
        if (inputValue) {
            const date = new Date()
            const newToDoObj = {
                id: date.getTime(),
                title: inputValue,
                completed: false,
                userId: 1
            }

            setData([...data, newToDoObj])
            setInputValue("")
        }
        return
    }

    const deleteToDo = (id) => {
        setData(() => data.filter(item => item.id !== id))
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            if (e.target.value !== '') {
                setTodos(() => data.filter(todo => todo.title.includes(e.target.value)))
            }
            else {
                setTodos([...data])
            }
        }, 500)
    }

    const errorMessage = todos.length === 0

    return (
        <div className='todoList'>
            <div className="header">
                <Input type='text' value={searchText} onChange={handleSearchChange} placeholder="Search here..." />
            </div>
            <div className='todoWrapper'>
                <div className="todoBox">
                    {!errorMessage ? todos.map((todo, index) => {
                        return (
                            <div className='todoRow'>
                                <ToDoCard key={todo.id} title={todo.title} checked={todo.completed} onClickCheckBox={(e) => onClickCheckBox(e, todo.id)} />
                                <DeleteIcon onClick={() => deleteToDo(todo.id)} />
                            </div>
                        )
                    }) : (<p className='no-items'>No items</p>)}
                </div>
            </div>
            <div className='addToDoWrapper'>
                <Input type='text' placeholder='Add to do' onChange={onChange} value={inputValue} />
                <Button buttonText={'Add'} onClick={addToDo} />
            </div>
        </div>
    )
}

export default Todo