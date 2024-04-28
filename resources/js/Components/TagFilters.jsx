import Button from "./Button";

export default function TagFilters({ tags, onSelectTag }) {

  return (
    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
      {tags.map((tag, index) => (
        <Button
          key={tag} // Unique key for each child in a list
          onClick={() => onSelectTag(tag)}
          className={`bg-blue-500 hover:bg-blue-700 text-white text-base px-2 py-2 mr-2 mb-2 ${index !== 0 ? 'pl-4' : ''}`}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};
