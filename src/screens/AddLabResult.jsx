import React from 'react';
import { Loading } from '../components/Loading';
import { FormAddLabResultPasien } from '../containers/FormAddLabResultPasien';
import { Appointment }  from '../utils/Appointment'

export class AddLabResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            pasien: {},
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    
        Appointment.getDetailPasien(this.props.match.params.id).then(response => {
            if (response.status === 200) {
                this.setState({
                    loading: false,
                    pasien: response.result
                })
            } else {
                alert('Data tidak ditemukan')
                this.props.history.push('/all-pasien')
            }
        })
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.setState({
            loading: true
        })

        const data = new FormData(e.target)
        const dataJson = {}

        data.forEach((val, key) => {
            if (val !== "") {
                let name = key.split('.');
                if (name.length > 1) {
                    let last = name.pop();
                    name.reduce((prev, next) => {
                        return prev[next] = prev[next] || {};
                    }, dataJson)[last] = val
                } else {
					dataJson[key] = val
				}
            }
        })

        Appointment.addLabResultPasien(dataJson).then(response => {
            if (response.status === 200) {
                this.setState({
                    loading: false,
                })
                alert(`Sukses add lab result pasien ${this.state.pasien.nama} menjadi ${response.result.jenis} ${response.result.hasil}`)
            } else {
                this.setState({
                    loading: false
                })
                alert(`Gagal add billing pasien bernama ${this.state.pasien.nama}`)
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading msg="Fetching Data..." />
            )
        } else {
            return (
                <FormAddLabResultPasien pasien={this.state.pasien} onSubmit={this.handleFormSubmit} />
            )
        }
    }
}