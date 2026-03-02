import { act, render, screen } from "@testing-library/react"
import RepositoriesListItem from "./RepositoriesListItem"
import { MemoryRouter } from "react-router"

/**
 * 3. Avoiding render by Modile mock
 * jest.mock('../tree/FileIcon', () => {
    return() =>{
        return 'File Icon Component';
    }
    })
 */


function renderComponent(){
    const repository = {
        full_name: "facebook/react",
        language: 'Javascript', 
        description: 'javacript is primary language, react is a library', 
        owner:{
            login : 'facebook'
        },
        name:'react',
        html_url: 'https://github.com/facebook/react'
    }
    
    render(
        <MemoryRouter>
            <RepositoriesListItem  repository={repository} />
        </MemoryRouter>
        )
    
    return {repository};
}

test( 'shows the link item is displayed in html github homepage', async () => {
    const{ repository } = renderComponent();
/**
 * 4. Act() with pause
 * await act(async () =>{
        await pause();
    })
 */

    // 1. findBy or findAllBy  to detect when the component
    // await screen.findByRole('img', { name: new RegExp(/Javascript/i)});
    await screen.findByRole('img', {name:'Javascript'});
    //now checking for the link

    const link =  screen.getByRole('link', { 
        name: /github repository/i,
    });

    expect(link).toHaveAttribute('href', repository.html_url)
}); 

test('shows a file icon with the appropriate icon', async() =>{
    renderComponent();

    const fileIcon = await screen.findByRole('img', {name:'Javascript'});
    expect(fileIcon).toHaveClass('js-icon');
})

test('shows a link  to the code editor page', async () => {
    const {repository} = renderComponent();

    await screen.findByRole('img', {name: 'Javascript'});

    const link =  screen.getByRole('link', {
        name: new RegExp(repository.owner.login)
    })
    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})
// const pause = () => {
//     return new Promise(resolve => {
//         setTimeout(() =>{
//             resolve();
//         }, 1000)
//     });
// }