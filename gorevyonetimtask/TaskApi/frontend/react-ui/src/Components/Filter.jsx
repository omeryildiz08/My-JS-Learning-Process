//tamamlananları gösterme, filtreleme komponenti
const Filter = ({showCompleted, setShowCompleted}) => {
return(
<label >
    <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(prev => !prev)} />
    Tamamlananları Göster
</label>
);
};
export default Filter;