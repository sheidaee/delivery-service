import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Form from './Form'
import GraphApi from "../../utilities/graph"

configure({ adapter: new Adapter() });

describe("<Form />", () => {
  let store
  let onSave
  let subject
  let form
  let inputPath  
  const state = {
    nodes: [
      { id: "A" },
      { id: "B" },
      { id: "C" },
      { id: "D" },
      { id: "E" },
      { id: "F" }
    ],
    links:[
      { source: "A", target: "B", weight: 1 },
      { source: "A", target: "C", weight: 4 },
      { source: "A", target: "D", weight: 10 },
      { source: "B", target: "E", weight: 3 },
      { source: "C", target: "D", weight: 4 },
      { source: "C", target: "F", weight: 2 },
      { source: "D", target: "E", weight: 1 },
      { source: "E", target: "B", weight: 3 },
      { source: "E", target: "A", weight: 2 },
      { source: "F", target: "D", weight: 1 }
    ],      
  }  
  const graph = new GraphApi(state.nodes, state.links)
  
  
  beforeEach(() => {
    store  = createStore(combineReducers({ form: formReducer }))
    onSave = sinon.stub().returns(Promise.resolve())
    
    const props = {
      onSave,
      gNodes: state.nodes,
      gLinks: state.links,
    }

    subject = mount(
      <Provider store={store}>
        <Form {...props} />
      </Provider>
    )  

    form      = subject.find('form')
    inputPath = subject.find('input[name="path"]')
  })

  it("It should call calculate delivery cost function after submitting the form", () => {    
    inputPath.simulate("change", { target: { value: "A-B-E" } });

    form.simulate('submit')
    expect(onSave.callCount).toEqual(1)    
  })

  it("It should calculate delivery cost correctly", () => {            
    expect(graph.deliveryCost("A-B-E")).toEqual(4)    
  })

  it("It should output ’No Such Route’, In case given route is not exists", () => {            
    expect(graph.deliveryCost("A-B-E-P")).toEqual("No Such Route")    
  })
})
