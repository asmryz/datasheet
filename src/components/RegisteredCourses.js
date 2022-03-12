import axios from 'axios';
import React, { Component } from 'react';
const URL = process.env.REACT_APP_API_URL;

export class RegisteredCourses extends Component {
	state = {
		grades: [],
	};
	getGrades = () => {
		axios.get(`${URL}/api/registrations/grades`).then((grades) => {
			this.setState({ grades: grades.data.grades });
			//console.log(regs.data);
		});
	};
	handleChange = (e) => {
		const { name, value } = e.target;
		//console.log(name, value);
		axios.patch(`${URL}/api/registrations/update`, { id: name, gradeid: value }).then((res) => {
			//console.log(res.data.ok);
			axios.get(`${URL}/api/registrations/${this.props.student.regno}`).then((regs) => {
				this.props.setRegistrations(regs.data);
				//console.log(regs.data);
			});
		});
	};
	componentDidMount() {
		this.getGrades();
	}
	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Code</th>
							<th>Title</th>
							<th>CrHr</th>
							<th>Grade</th>
							<th>GPA</th>
						</tr>
					</thead>
					<tbody>
						{this.props.regs.map((reg) => (
							<tr key={reg._id}>
								<td>{reg.course.code}</td>
								<td>{reg.course.title}</td>
								<td>{reg.course.crhr}</td>
								<td>
									<select name={reg._id} value={reg.gradeid || ''} onChange={this.handleChange}>
										<option hidden value=''></option>
										{this.state.grades.length !== 0 &&
											this.state.grades.map((g) => (
												<option key={g.gradeid} value={g.gradeid}>
													{g.grade}
												</option>
											))}
									</select>
								</td>
								<td>{reg.gradeid !== null ? reg.grade.gpa : ''}</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>{this.props.gpa.toFixed(2)}</td>
						</tr>
					</tfoot>
				</table>
				<div>
					<pre>{JSON.stringify(this.state, null, 2)}</pre>
				</div>
			</div>
		);
	}
}
