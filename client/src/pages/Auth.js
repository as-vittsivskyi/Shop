import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const history = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(user)
      user.setIsAuth(true)
      history(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }

  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Введіть email" value={email} onChange={e => setEmail(e.target.value)} />
          <Form.Control type="password" className="mt-3" placeholder="Введіть пароль" value={password} onChange={e => setPassword(e.target.value)} />
        </Form>
        <Row className="mt-3">
          <Col xs={6}>
            {isLogin ? <div>
              <p className="d-flex"><span style={{ whiteSpace: 'nowrap', paddingRight: 6 }}>Немає аккаунта?</span> <NavLink style={{color: "blue"}} to={REGISTRATION_ROUTE}>Зареєструватись</NavLink></p>
            </div>
            :
            <div>
              <p className="d-flex"><span style={{ whiteSpace: 'nowrap', paddingRight: 6 }}>Є аккаунт?</span> <NavLink style={{color: "blue"}} to={LOGIN_ROUTE}>Увійти</NavLink></p>
            </div>
            }
          </Col>
          <Col xs={6} className="text-end">
            <Button variant="outline-success" onClick={click}>{isLogin ? 'Вхід' : 'Реєстрація'}</Button>
          </Col>
        </Row>

      </Card>
    </Container>
  );
});

export default Auth;
