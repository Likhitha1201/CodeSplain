import {render, screen} from "@testing-library/react";
import AuthButtons from "./AuthButtons";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { createServer } from "../../test/server";
// wrioweur@laksjf.com, wrioweur
// case1: 
// every server and test cases at a time. Which is not good so go with describe -{it groups the testing methods}
//createServer() => get '/api/user - --> {user: null}

async function renderComponent(){
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
       <MemoryRouter>
        <AuthButtons />
    </MemoryRouter> 
    </SWRConfig>
  
    )
    
        await screen.findAllByRole('link');    
}

describe('When user signed In', () => {
    createServer([
        {
        // method: 'get',
        path:'/api/user',
        res: () =>{
            return { user: {id: 1, email: "wrioweur@laksjf.com"}}   
        },
        } 
    ])

    test("sign in and sign up are not visible", async () => {

        await renderComponent();

        const signInButton = screen.queryByRole('link',{
            name: /sign in/i
        });

        const signUpButton = screen.queryByRole('link', {
            name: /sign up/i
        }) 

         expect(signInButton).not.toBeInTheDocument();
         expect(signUpButton).not.toBeInTheDocument();
    });

    test("sign out is visible", async () => {
        await renderComponent();
        const signOutButton = screen.getByRole('link',  {
            name: /sign out/i
        });

        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute('href', '/signout');
    });
})

describe('When user is not signedIn', () => {
    createServer ([
    {
        // method: 'get',
        path: '/api/user',
        res: () => {
               return {user: null}
            }
        }
    ])

    test(" SingIn and SignUp buttons are visible", async () => { 
        await renderComponent();
        // await screen.findAllByRole('link');    
        const signInButton = screen.getByRole('link', {
            name: /sign in/i
        }) 

        const signUpButton = screen.getByRole('link', {
            name: /sign up/i
        })

       await expect(signInButton).toBeInTheDocument();
       await expect(signInButton).toHaveAttribute('href', '/signin')
       await expect(signUpButton).toBeInTheDocument();
       await expect(signUpButton).toHaveAttribute('href', '/signup');
    });

    test("sign out is not visible", async() => {
        await renderComponent();

        const signOutButton = screen.queryByRole('link', {
            name: /Sign Out/i
        })

        await expect(signOutButton).not.toBeInTheDocument();  
    });
});
//  to create a manual delay in your code's execution we make use of pause()a. 
const pause = () => {new Promise ((resolve) => { 
    return setTimeout(resolve, 1000);
    })
}
// Here we use '.only' because-> that means we have to run only that test specific case not other eg: describe.only() ot test.only()

// createServer() => get '/api/user - --> {user: {id: 1, email: "wrioweur@laksjf.com}}
