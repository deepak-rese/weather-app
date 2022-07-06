import React from "react";
class HomeErrorBoundary extends React.Component<any,{hasError:boolean,error?:any}> {
    constructor(props:any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error:any) {
      return { hasError: true, error };
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }

  export default HomeErrorBoundary;