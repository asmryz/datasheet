import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HkStudentForm from './HkStudentForm';
const URL = process.env.REACT_APP_API_URL;

const HkStudentList = () => {
	const [students, setStudents] = useState([]);
	const [regno, setRegno] = useState(null);

	useEffect(() => {
		axios.get(`${URL}/api/students`).then((res) => {
			setStudents(res.data);
		});
	}, []);

	const showUpdated = (std) => {
		setStudents(students.map((student) => (student._id === std._id ? std : student)));
		setRegno(null);
	};

	const handleClick = (std) => {
		setRegno(std.regno);
	};
	let url = '#';

	return (
		<div>
			<div className='col'>
				<table>
					<thead>
						<tr>
							<th>Reg #</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student._id}>
								<td>{student.regno}</td>
								<td>
									<a href={url} onClick={() => handleClick(student)}>
										{student.studentname}
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='col'>{regno !== null && <HkStudentForm regno={regno} showUpdated={showUpdated} />}</div>
			<pre>{JSON.stringify({ students, regno }, null, 2)}</pre>
		</div>
	);
};

export default HkStudentList;
