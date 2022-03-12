import axios from 'axios';
import React, { Component } from 'react';
const URL = process.env.REACT_APP_API_URL;

export class Semester extends Component {
	state = {
		semesters: [],
		semester: 0,
	};
	getSemesters = () => {
		axios.get(`${URL}/api/courses/all`).then((semesters) => {
			//this.props.setStudent(student.data);
			this.setState({ semesters: [...semesters.data] });
			console.log('semester loaded');
		});
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		this.props.setSemester(value);
	};

	componentDidMount() {
		this.getSemesters();
	}
	render() {
		return (
			<table>
				<tbody>
					<tr>
						<th>Semester : </th>
						<td>
							<select name='semester' value={this.state.semester} onChange={this.handleChange}>
								<option hidden></option>
								{this.state.semesters.length !== 0 &&
									this.state.semesters.map((sem) => (
										<option key={sem} value={sem}>
											{sem}
										</option>
									))}
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}
