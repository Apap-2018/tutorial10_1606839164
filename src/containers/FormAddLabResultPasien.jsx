import React from 'react';

export const FormAddLabResultPasien = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <h2>Add Lab Result Pasien</h2>
            <div className="form-group">
                <label>Jenis<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="jenis" defaultValue=""/>
            </div>

            <div className="form-group">
                <label>Hasil<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="hasil" defaultValue=""/>
            </div>

            <div className="form-group">
                <label>Tanggal Pengajuan</label>
                <input type="date" className="form-control" name="tanggalPengajuan" defaultValue=""/>
            </div>
            
            <input type="hidden" name="pasien.id" value={props.pasien.id} />
            <button className="btn btn-success" value="submit">Submit Lab Result</button>
        </form>
    )
}