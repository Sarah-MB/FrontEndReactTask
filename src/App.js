import * as React from 'react';
import { GridOverlay, DataGrid } from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";

const riceFilterModel = {
  items: [{ columnField: 'FirstName', operatorValue: 'contains', value: '' }],
};

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'FirstName', headerName: 'First Name', width: 150 },
  { field: 'LastName', headerName: 'Last Name', width: 150 },
  { field: 'Gender', headerName: 'Gender', width: 150 },
  { field: 'Latitude', headerName: 'Latitude', width: 150 },
  { field: 'Longitude', headerName: 'Longitude', width: 150 },
  { field: 'CreditCardNumber', headerName: 'Card Number', width: 150 },
  { field: 'CreditCardType', headerName: 'Card Type', width: 150 },
  { field: 'Email', headerName: 'Email', width: 150 },
  { field: 'DomainName', headerName: 'Domain', width: 150 },
  { field: 'PhoneNumber', headerName: 'Phone', width: 150 },
  { field: 'MacAddress', headerName: 'MacAddress', width: 150 },
  { field: 'URL', headerName: 'URL', width: 150 },
  { field: 'UserName', headerName: 'User Name', width: 150 },
  { field: 'LastLogin', headerName: 'Last Login', width: 150 },
  { field: 'PaymentMethod', headerName: 'PaymentMethod', width: 150 },
];

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}
export default function BasicToolbarFilteringGrid() {
  const [state, setState] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      let data = [];
      const result = await axios.get("https://api.enye.tech/v1/challenge/records");
      result.data.records.profiles.map((item, index) => (
        data.push({...item, id: index+1})
      ))
      setState(data);
    })();
  }, []);

  const data = {columns: columns, rows: state }

  return (
    <div className="container" style={{ height: 400, width: '100%' }}>
      {console.log(data)}
      <DataGrid
        components={{
          loadingOverlay: CustomLoadingOverlay,
        }}
        loading
        autoHeight
        pageSize={20}
        rowsPerPageOptions={[20, 30, 40]}
        pagination
        {...data}
        filterModel={riceFilterModel}
        showToolbar />
    </div>
  );
}
