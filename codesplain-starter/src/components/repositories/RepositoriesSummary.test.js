import { render, screen } from "@testing-library/react"
import RepositoriesSummary from "./RepositoriesSummary"

test('displays the repository', () => {
    const repository = {
        language: 'JavaScript',
        forks: 10 ,
        stargazers_count: 20,
        open_issues: 5
    }
    render(<RepositoriesSummary repository={repository}/>);
    
    // const lang = screen.getByText(repository.language);
    // expect(lang).toBeInTheDocument();
    // const fork = screen.getByText(/10/i);
    // expect(fork).toBeInTheDocument();
    // const star = screen.getByText(repository.stargazers_count);
    // expect(star).toBeInTheDocument();
    // const issues = screen.getByText(/5/i);
    // expect(issues).toBeInTheDocument();


    for(let key in repository){
        const value = repository[key];
        const element = screen.getByText(new RegExp(value));
        expect(element).toBeInTheDocument();
    }
})