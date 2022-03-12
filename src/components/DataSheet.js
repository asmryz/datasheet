//import axios from 'axios';
import React, { Component } from 'react';
import { Student } from './Student';
import { Semester } from './Semester';
import { SemesterCourses } from './SemesterCourses';
import axios from 'axios';
import { RegisteredCourses } from './RegisteredCourses';
const URL = process.env.REACT_APP_API_URL;

class DataSheet extends Component {
	state = {
		// regno: null,
		student: {},
		semester: 0,
		gpa: 0,
		courseids: [],
		regs: [],
	};

	setStudent = (s) => {
		this.setState({ student: { ...s }, semester: 0, regs: [], courseids: [], gpa: 0 });
	};

	setRegistrations = (data) => {
		const { regs, gpa } = data;
		//console.log(regs, gpa);
		this.setState({ regs, gpa: gpa !== undefined ? gpa.gpa : 0 });
	};

	setCourseIds = (args) => {
		if (args.name === 'master') {
			this.setState({ courseids: args.courseids });
		} else {
			const { courseids } = this.state;
			let index = courseids.indexOf(Number(args.value));
			index === -1 ? courseids.push(Number(args.value)) : courseids.splice(index, 1);
			this.setState({ courseids });
		}
	};

	addRegistrations = () => {
		axios
			.post(`${URL}/api/registrations/add`, {
				regno: this.state.student.regno,
				courseids: JSON.stringify(this.state.courseids),
			})
			.then((regs) => {
				//this.setState({ courses: [...courses.data] });
				this.setState({ courseids: [] });
				axios.get(`${URL}/api/registrations/${this.state.student.regno}`).then((regs) => {
					this.setRegistrations(regs.data);
					//console.log(regs.data);
				});
				//console.log(regs.data);
			});
	};

	setSemester = (semno) => {
		this.setState({ semester: semno });
	};

	render() {
		return (
			<div>
				<div className='col'>
					<Student
						setStudent={this.setStudent}
						student={this.state.student}
						setRegistrations={this.setRegistrations}
					/>
					<br />
					{Object.keys(this.state.student).length !== 0 && <Semester setSemester={this.setSemester} />}
					<br />
					{this.state.semester !== 0 && (
						<SemesterCourses
							semester={this.state.semester}
							courseids={this.state.courseids}
							setCourseIds={this.setCourseIds}
							addRegistrations={this.addRegistrations}
							regs={this.state.regs.map((r) => r.courseid)}
						/>
					)}
				</div>
				<div className='col'>
					{this.state.regs.length !== 0 && (
						<RegisteredCourses
							regs={this.state.regs}
							setRegistrations={this.setRegistrations}
							student={this.state.student}
							gpa={this.state.gpa}
						/>
					)}
				</div>
				<div className='col' style={{ width: '20%' }}>
					<div>
						<pre>{JSON.stringify(this.state, null, 2)}</pre>
					</div>
				</div>
			</div>
		);
	}
}

export default DataSheet;
