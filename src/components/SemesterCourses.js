import axios from 'axios';
import React, { Component } from 'react';
const URL = process.env.REACT_APP_API_URL;

export class SemesterCourses extends Component {
	state = {
		courses: [],
	};

	getCourses = () => {
		const { semester } = this.props;

		axios.get(`${URL}/api/courses/${semester}`).then((courses) => {
			this.setState({ courses: [...courses.data] });
			//console.log(courses.data);
		});
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		let courseids = e.target.checked
			? this.state.courses.map((course) => course.courseid).filter((e) => !this.props.regs.includes(e))
			: [];

		this.props.setCourseIds({ name, value, courseids });
	};

	componentDidMount() {
		this.getCourses();
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.getCourses();
		}
	}

	render() {
		return (
			<div>
				{this.state.courses.length !== 0 && (
					<table>
						<thead>
							<tr>
								<th>
									<input type='checkbox' name='master' onChange={this.handleChange} />
								</th>
								<th>Code</th>
								<th>Title</th>
								<th>CrHr</th>
							</tr>
						</thead>
						<tbody>
							{this.state.courses.map((c) => (
								<tr key={c.courseid}>
									<td>
										{!this.props.regs.includes(c.courseid) ? (
											<input
												type='checkbox'
												name='courseid'
												value={c.courseid}
												onChange={this.handleChange}
												checked={this.props.courseids.includes(c.courseid)}
											/>
										) : (
											''
										)}
									</td>
									<td>{c.code}</td>
									<td style={{ width: '400px' }}>{c.title}</td>
									<td>{c.crhr}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				{this.props.courseids.length !== 0 && <button onClick={this.props.addRegistrations}>Register</button>}
				{/* <div>
					<pre>{JSON.stringify(this.props, null, 2)}</pre>
				</div> */}
			</div>
		);
	}
}
