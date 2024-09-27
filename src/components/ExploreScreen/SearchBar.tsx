import { StyleSheet, TextInput, View } from "react-native";
interface SearchBarProps {
  searchTerm: string; // Current value of the search term
  setSearchTerm: (term: string) => void; // Function to update the search term
}

const SearchBar: React.FC<SearchBarProps> = ({searchTerm,setSearchTerm}) => {
    return (
      <View style={styles.container}>
        <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
          style={styles.input}
          placeholder="Search for stocks"
          placeholderTextColor="#666"
        />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    input: {
      backgroundColor: '#232639',
      borderRadius: 30,
      marginBottom:10,
      padding: 10,
      color: '#FFF',
    },
  });
  export default SearchBar;