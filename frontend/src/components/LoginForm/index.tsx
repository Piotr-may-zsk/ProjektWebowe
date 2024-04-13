import React, {ChangeEventHandler} from "react";


export class LoginForm extends React.Component{
    // @ts-expect-error becouse yes
    constructor(props) {
        super(props);
        this.state = {sended: false, errorMessages: [], result: "Nie wyslano"};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event : ChangeEventHandler) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event ) {
        event.preventDefault()
    }
    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <label>Email:</label>
                <input value={this.state.email} required onChange={this.handleInputChange} type="email" name="email"
                       placeholder="email"/>
                <label>Password:</label>
                <input value={this.state.password} required onChange={this.handleInputChange}
                       type="password" name="password"  />
                <button type="submit">Zaloguj się</button>
                <p>Nie masz konta? <a href={'/register'}>Zarejestruj się</a></p>
            </form>

        )
    }

}